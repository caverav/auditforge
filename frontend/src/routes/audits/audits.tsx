import { t } from "i18next";
import SearchInput from "../../components/input/SearchInput";
import { useEffect, useState } from "react";
import PrimarySwitch from "../../components/switch/PrimarySwitch";
import PrimaryButton from "../../components/button/PrimaryButton";
import SimpleInput from "../../components/input/SimpleInput";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import {
  createAudit,
  getCompanies,
  getLanguages,
  getTypes,
  getAudits,
  getAuditColumns,
  fetchUsername,
} from "../../services/audits";
import Modal from "../../components/modal/Modal";
import DefaultRadioGroup from "../../components/button/DefaultRadioGroup";
import UITable from "../../components/table/UITable";
import type { Column } from "../../components/table/UITable";
import type { Audit } from "../../services/audits";

interface ListItem {
  id: number;
  value: string;
}

interface TmpAudit {
  _id: string;
  name: string;
  auditType: string;
  language: string;
  company: {
    _id: string;
    name: string;
  };
  collaborators: {
    _id: string;
    username: string;
  }[];
  date: string;
  creator: {
    username: string;
    _id: string;
  };
  state: string;
  type: string;
  connected: string[];
  createdAt: string;
}

interface NewAudit {
  type: string;
  name: string;
  assessment: string;
  languaje: string;
}

const RadioOptions = [
  { id: "1", label: t("default"), value: "1" },
  { id: "2", label: t("multi"), value: "2" },
];

type TypeData = {
  name: string;
  templates: [];
  sections: [];
  hidden: [];
  stage: string;
};

type LanguageData = {
  language: string;
  locale: string;
};

type CompanyData = {
  _id: string;
  name: string;
  shortName: string;
};

export const Audits = () => {
  const [finding, setFinding] = useState<string>("");
  const [myAudits, setMyAudits] = useState(false);

  const [usersConnected, setUsersConnected] = useState(false);

  const [isOpenNewAuditModal, setIsOpenNewAuditModal] = useState(false);

  const [newAudit, setNewAudit] = useState<NewAudit | null>({
    type: "",
    name: "",
    assessment: "",
    languaje: "",
  });

  const [selectedValue, setSelectedValue] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [nameSearch, setNameSearch] = useState<string>("");

  const [nameAudit, setNameAudit] = useState<string>("");

  const [auditType, setAuditType] = useState<ListItem[]>([]);
  const [currentAuditType, setCurrentAuditType] = useState<ListItem>({
    id: 0,
    value: "",
  });
  const [loadingAuditType, setLoadingAuditType] = useState<boolean>(false);

  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem>({
    id: 0,
    value: "",
  });
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(true);

  const [company, setCompany] = useState<ListItem[]>([]);
  const [currentCompany, setCurrentCompany] = useState<ListItem>({
    id: 0,
    value: "",
  });
  const [loadingCompany, setLoadingCompany] = useState<boolean>(false);

  const [participants, setParticipants] = useState<string>("");

  const [date, setDate] = useState<string>("");

  const [columns, setColumns] = useState<Column[]>([]);

  const [data, setData] = useState<Object[]>([]);

  const [filteredData, setFilteredData] = useState<Object[]>([]);

  const [username, setUsername] = useState<string>("");

  const onFilter = (accessor: string, value: string) => {
    const newData = data.filter((item) => item[accessor].includes(value));
    setFilteredData(newData);
  };

  fetchUsername().then((username) => setUsername(username.username));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataLanguage = await getLanguages();
        const languageNames = dataLanguage.datas.map(
          (item: LanguageData, index: number) => ({
            id: index,
            value: item.language,
          }),
        );
        setLanguages(languageNames);
        setCurrentLanguage(languageNames[0]);
        setLoadingLanguage(false);

        const dataType = await getTypes();
        const typeNames = dataType.datas.map(
          (item: TypeData, index: number) => ({
            id: index + 1,
            value: item.name,
          }),
        );
        if (typeNames.length > 0) {
          setAuditType([currentAuditType, ...typeNames]);
        } else {
          setAuditType([currentAuditType]);
        }
        setLoadingAuditType(false);

        const dataColumns = await getAuditColumns();
        setColumns(dataColumns);
        const dataCompany = await getCompanies();
        const companyNames = dataCompany.datas.map(
          (item: CompanyData, index: number) => ({
            id: index + 1,
            value: item.name,
          }),
        );
        setCompany(companyNames);
        setCurrentCompany(companyNames);
        setLoadingCompany(false);

        const dataAudits = await getAudits().then((res) => {
          const data = res.datas.map((audit: TmpAudit) => {
            console.log(audit);
            const auditData: Audit = {
              _id: audit._id,
              name: t(audit.name),
              auditType: audit.auditType,
              language: audit.language,
              company: audit.company?.name,
              collaborators: audit.collaborators.map((c) => c.username),
              createdAt: audit.createdAt,
              creator: audit.creator.username,
              state: audit.state,
              type: audit.type,
              connected: audit.connected,
            };

            console.log(auditData);
            return auditData;
          });
          return data;
        });

        setFilteredData(dataAudits);
        setData(dataAudits);
      } catch (err) {
        setLoadingLanguage(false);
      }
    };
    fetchData();
  }, []);

  const handleCancelNewAudit = () => {
    setNewAudit(null);
    setIsOpenNewAuditModal(!isOpenNewAuditModal);
  };

  const handleSubmitNewAudit = async () => {
    try {
      await createAudit({
        name: nameAudit,
        auditType: currentAuditType.value,
        language: currentLanguage.value,
        type: selectedValue,
      });
      setNewAudit(null);
    } catch (error) {
      setError("Error creating audit");
      console.error("Error:", error);
    }
    setNewAudit(null);
    setIsOpenNewAuditModal(!isOpenNewAuditModal);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-gray-900 shadow-lg rounded-lg p-6 mt-6">
        <div className="flex items-center mb-4">
          <SearchInput
            label={""}
            id="finding"
            name="finding"
            type="text"
            placeholder="Search Finding"
            value={finding}
            onChange={setFinding}
            onClick={() => {}}
            buttonLabel=""
          />
          <div className="ml-1">
            <span className="mx-1">{t("myAudits")}</span>
            <PrimarySwitch enabled={myAudits} onChange={setMyAudits} />
          </div>
          <div className="ml-1">
            <span className="mx-1">{t("usersConnected")}</span>
            <PrimarySwitch
              enabled={usersConnected}
              onChange={setUsersConnected}
            />
          </div>
          <div className="mt-2 mx-2">
            <PrimaryButton
              onClick={() => setIsOpenNewAuditModal(!isOpenNewAuditModal)}
            >
              {t("newAudit")}
            </PrimaryButton>
          </div>
        </div>

        <Modal
          title={t("createAudit")}
          onCancel={handleCancelNewAudit}
          onSubmit={handleSubmitNewAudit}
          cancelText={t("btn.cancel")}
          submitText={t("btn.create")}
          isOpen={isOpenNewAuditModal}
        >
          <DefaultRadioGroup
            name={"AuditType"}
            options={RadioOptions}
            value={selectedValue}
            onChange={setSelectedValue}
          />
          <SimpleInput
            label={t("name")}
            id="name"
            name="name"
            type="text"
            placeholder="Search"
            value={nameAudit}
            onChange={setNameAudit}
          />
          {!loadingAuditType && (
            <SelectDropdown
              title={t("auditType")}
              items={auditType}
              selected={currentAuditType}
              onChange={setCurrentAuditType}
            />
          )}
          {!loadingLanguage && (
            <SelectDropdown
              title={t("languages")}
              items={languages}
              selected={currentLanguage}
              onChange={setCurrentLanguage}
            />
          )}
        </Modal>

        <div className="flex justify-between items-center mb-4" />

        <div className="mb-4 flex space-x-4">
          <div className="w-1/6 top-2.5">
            <SimpleInput
              label={t("name")}
              id="name"
              name="name"
              type="text"
              placeholder="Search"
              value={nameSearch}
              onChange={setNameSearch}
            />
          </div>
          <div className="w-1/6">
            {!loadingAuditType && (
              <SelectDropdown
                title={t("auditType")}
                items={auditType}
                selected={currentAuditType}
                onChange={setCurrentAuditType}
              />
            )}
          </div>
          <div className="w-1/6">
            {!loadingLanguage && (
              <SelectDropdown
                title={t("languages")}
                items={languages}
                selected={currentLanguage}
                onChange={setCurrentLanguage}
              />
            )}
          </div>
          <div className="w-1/6">
            {!loadingCompany && (
              <SelectDropdown
                title={t("company")}
                items={company}
                selected={currentCompany}
                onChange={setCurrentCompany}
              />
            )}
          </div>
          <div className="w-1/6 top-2.5">
            <SimpleInput
              label={t("participants")}
              id="participants"
              name="participants"
              type="text"
              placeholder="Search"
              value={participants}
              onChange={setParticipants}
            />
          </div>
          <div className="w-1/6 top-2.5">
            <SimpleInput
              label={t("date")}
              id="date"
              name="date"
              type="text"
              placeholder="Search"
              value={date}
              onChange={setDate}
            />
          </div>
        </div>
        <UITable
          columns={columns}
          data={filteredData}
          keyExtractor={(item) => item._id}
          sortable={true}
          filterable={true}
          emptyState={t("noAudits")}
          onFilter={onFilter}
        />
      </div>
    </div>
  );
};
