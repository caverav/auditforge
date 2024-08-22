import DefaultRadioGroup from "../../components/button/DefaultRadioGroup";
import PrimaryButton from "../../components/button/PrimaryButton";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import SearchInput from "../../components/input/SearchInput";
import SimpleInput from "../../components/input/SimpleInput";
import Modal from "../../components/modal/Modal";
import PrimarySwitch from "../../components/switch/PrimarySwitch";
import UITable from "../../components/table/UITable";
import type { Column } from "../../components/table/UITable";
import { useSortableTable } from "../../hooks/useSortableTable";
import { useTableFiltering } from "../../hooks/useTableFiltering";
import {
  createAudit,
  fetchUsername,
  getAuditColumns,
  getAudits,
  getCompanies,
  getLanguages,
  getTypes,
} from "../../services/audits";
import type { Audit } from "../../services/audits";
import { t } from "i18next";
import { useEffect, useState } from "react";

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

  const [selectedValue, setSelectedValue] = useState("");

  const [, setError] = useState<string | null>(null);

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

  const [filteredData, setFilteredData] = useState<Audit[]>([]);

  const [tableData, handleSorting, setTableData] = useSortableTable<Audit>(
    filteredData,
    columns,
  );

  const [filters, handleFilterChange] = useTableFiltering<Audit>(
    filteredData,
    columns,
    setTableData,
  );

  useEffect(() => {
    fetchUsername().then((username) => {
      handleFilterChange("creator", myAudits ? username.datas.username : "");
    });
  }, [myAudits]);

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

        setTableData(dataAudits);
        setFilteredData(dataAudits);
      } catch (err) {
        setLoadingLanguage(false);
      }
    };
    fetchData();
  }, []);

  const handleCancelNewAudit = () => {
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
    } catch (error) {
      setError("Error creating audit");
      console.error("Error:", error);
    }
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
              onChange={(value) => {
                setNameSearch(value);
                handleFilterChange("name", value);
              }}
            />
          </div>
          <div className="w-1/6">
            {!loadingAuditType && (
              <SelectDropdown
                title={t("auditType")}
                items={auditType}
                selected={currentAuditType}
                onChange={(value) => {
                  setCurrentAuditType(value);
                  handleFilterChange("auditType", value.value);
                }}
              />
            )}
          </div>
          <div className="w-1/6">
            {!loadingLanguage && (
              <SelectDropdown
                title={t("languages")}
                items={languages}
                selected={currentLanguage}
                onChange={(value) => {
                  setCurrentLanguage(value);
                  handleFilterChange("language", value.value);
                }}
              />
            )}
          </div>
          <div className="w-1/6">
            {!loadingCompany && (
              <SelectDropdown
                title={t("company")}
                items={company}
                selected={currentCompany}
                onChange={(value) => {
                  setCurrentCompany(value);
                  handleFilterChange("company", value.value);
                }}
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
              onChange={(value) => {
                setParticipants(value);
                handleFilterChange("participants", value);
              }}
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
              onChange={(value) => {
                setDate(value);
                handleFilterChange("date", value);
              }}
            />
          </div>
        </div>
        <UITable
          columns={columns}
          data={tableData}
          keyExtractor={(item) => item._id}
          sortable={true}
          onSort={handleSorting}
          emptyState={t("noAudits")}
          filters={filters}
          onFilter={handleFilterChange}
        />
      </div>
    </div>
  );
};
