import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAuditById,
  getClients,
  getCollaborators,
  getCompanies,
  getLanguages,
  getTemplates,
} from "../../../../services/audits";
import { t } from "i18next";
import { Dayjs } from "dayjs";
import DayPicker from "../../../../components/button/DayPicker";
import SelectDropdown from "../../../../components/dropdown/SelectDropdown";
import SimpleInput from "../../../../components/input/SimpleInput";
import TextArea from "../../../../components/text/TextArea";

interface ListItem {
  id: number;
  value: string;
  label?: string;
}

type LanguagesData = {
  language: string;
  locale: string;
};

type TemplatesData = {
  id: string;
  name: string;
  ext: string;
};

type CompaniesData = {
  id: string;
  name: string;
  shortName: string;
};

type ClientsData = {
  id: string;
  email: string;
  company: string[];
  lastname: string;
  firstname: string;
  phone: string;
  title: string;
};

type CollaboratorsData = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  totpenabled: boolean;
  enabled: boolean;
};

export const General = () => {
  const { auditId } = useParams();

  const [nameAudit, setNameAudit] = useState<string>("");

  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem | null>(null);
  const [loadingLanguages, setLoadingLanguages] = useState<boolean>(true);

  const [templates, setTemplates] = useState<ListItem[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<ListItem | null>(null);
  const [loadingTemplates, setLoadingTemplates] = useState<boolean>(true);

  const [companies, setCompanies] = useState<ListItem[]>([]);
  const [currentCompany, setCurrentCompany] = useState<ListItem | null>(null);
  const [loadingCompanies, setLoadingCompanies] = useState<boolean>(false);

  const [clients, setClients] = useState<ListItem[]>([]);
  const [currentClient, setCurrentClient] = useState<ListItem | null>(null);
  const [loadingClients, setLoadingClients] = useState<boolean>(false);

  const [collaborators, setCollaborators] = useState<ListItem[]>([]);
  const [currentCollaborators, setCurrentCollaborators] =
    useState<ListItem | null>(null);
  const [loadingCollaborators, setLoadingCollaborators] =
    useState<boolean>(true);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [reportingDate, setReportingDate] = useState<Dayjs | null>(null);

  const [scope, setScope] = useState<string | string[]>("");

  const fetchAuditData = async () => {
    if (!auditId) return;
    try {
      const dataAudit = await getAuditById(auditId);
      if (dataAudit) {
        setNameAudit(dataAudit.datas.name);

        const selectedLanguage = languages.find(
          (item) => item.value === dataAudit.datas.language,
        );
        setCurrentLanguage(selectedLanguage!);

        const selectedTemplate = templates.find(
          (item) => item.value === dataAudit.datas.template.name,
        );
        setCurrentTemplate(selectedTemplate!);

        const selectedCompany = companies.find(
          (item) => item.value === dataAudit.datas.company?.name,
        );
        setCurrentCompany(selectedCompany!);

        const selectedClient = clients.find(
          (item) => item.value === dataAudit.datas.client?.email,
        );
        setCurrentClient(selectedClient!);

        const selectedCollaborator = collaborators.find(
          (item) =>
            item.value ===
            `${dataAudit.datas.collaborators[0]?.firstname} ${dataAudit.datas.collaborators[0]?.lastname}`,
        );
        setCurrentCollaborators(selectedCollaborator!);

        setStartDate(dataAudit.datas.date_start);
        setEndDate(dataAudit.datas.date_end);
        setReportingDate(dataAudit.datas.date);

        setScope(
          dataAudit.datas.scope
            .map((item: { name: string }) => item.name)
            .join("\n"),
        );
      } else {
        console.error("No audit data found");
      }
    } catch (error) {
      console.error("Error fetching audit data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataLanguage = await getLanguages();
        const languagesName = dataLanguage.datas.map(
          (item: LanguagesData, index: number) => ({
            id: index,
            value: item.locale,
            label: item.language,
          }),
        );
        setLanguages(languagesName);
        setLoadingLanguages(false);

        const dataTemplates = await getTemplates();
        const templatesName = dataTemplates.datas.map(
          (item: TemplatesData, index: number) => ({
            id: index,
            value: item.name,
            label: item.name,
          }),
        );
        setTemplates(templatesName);
        setLoadingTemplates(false);

        const dataCompany = await getCompanies();
        const companiesName = dataCompany.datas.map(
          (item: CompaniesData, index: number) => ({
            id: index,
            value: item.name,
            label: item.name,
          }),
        );
        setCompanies(companiesName);
        setLoadingCompanies(false);

        const dataClients = await getClients();
        const clientsName = dataClients.datas.map(
          (item: ClientsData, index: number) => ({
            id: index,
            value: item.email,
            label: item.email,
          }),
        );
        setClients(clientsName);
        setLoadingClients(false);

        const dataCollaborators = await getCollaborators();
        const collaboratorsName = dataCollaborators.datas.map(
          (item: CollaboratorsData, index: number) => ({
            id: index,
            value: `${item.firstname} ${item.lastname}`,
            label: `${item.firstname} ${item.lastname}`,
          }),
        );
        setCollaborators(collaboratorsName);
        setLoadingCollaborators(false);
      } catch (err) {
        setLoadingLanguages(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      auditId &&
      languages.length > 0 &&
      templates.length > 0 &&
      companies.length > 0 &&
      clients.length > 0 &&
      collaborators.length > 0
    ) {
      fetchAuditData();
    }
  }, [auditId, languages, templates, companies, clients, collaborators]);

  return (
    <div className="min-h-screen bg-gray-800 pt-16">
      <div className="bg-gray-800 flex justify-center items-center">
        <div className="w-full max-w-4xl bg-gray-900 shadow-lg rounded-lg p-8 mt-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col">
              <SimpleInput
                label={t("name")}
                id="name"
                name="name"
                type="text"
                placeholder="Search"
                value={nameAudit}
                onChange={setNameAudit}
              />
            </div>

            <div className="flex space-x-6">
              <div className="w-1/2">
                {!loadingLanguages && (
                  <SelectDropdown
                    title={t("language")}
                    items={languages}
                    selected={currentLanguage}
                    onChange={setCurrentLanguage}
                  />
                )}
              </div>
              <div className="w-1/2">
                {!loadingTemplates && (
                  <SelectDropdown
                    title={t("template")}
                    items={templates}
                    selected={currentTemplate}
                    onChange={setCurrentTemplate}
                  />
                )}
              </div>
            </div>

            <div className="flex space-x-6">
              <div className="w-1/2">
                {!loadingCompanies && (
                  <SelectDropdown
                    title={t("company")}
                    items={companies}
                    selected={currentCompany}
                    onChange={setCurrentCompany}
                  />
                )}
              </div>
              <div className="w-1/2">
                {!loadingClients && (
                  <SelectDropdown
                    title={t("client")}
                    items={clients}
                    selected={currentClient}
                    onChange={setCurrentClient}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col">
              {!loadingCollaborators && (
                <SelectDropdown
                  title={t("collaborators")}
                  items={collaborators}
                  selected={currentCollaborators}
                  onChange={setCurrentCollaborators}
                />
              )}
            </div>

            <div className="flex space-x-6">
              <div className="w-1/3">
                <DayPicker
                  label={t("startDate")}
                  selectedDay={startDate}
                  onChange={setStartDate}
                />
              </div>
              <div className="w-1/3">
                <DayPicker
                  label={t("endDate")}
                  selectedDay={endDate}
                  onChange={setEndDate}
                />
              </div>
              <div className="w-1/3">
                <DayPicker
                  label={t("reportingDate")}
                  selectedDay={reportingDate}
                  onChange={setReportingDate}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <TextArea
                label={t("auditScope")}
                rows={4}
                id={"references"}
                name={"references"}
                placeholder={""}
                value={scope}
                onChange={setScope}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
