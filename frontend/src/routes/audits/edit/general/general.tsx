import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuditById, getLanguages } from "../../../../services/audits";
import { Dayjs } from "dayjs";
import SimpleInput from "../../../../components/input/SimpleInput";
import { t } from "i18next";
import SelectDropdown from "../../../../components/dropdown/SelectDropdown";

interface ListItem {
  id: number;
  value: string;
}

type LanguagesData = {
  language: string;
  locale: string;
};

export const General = () => {
  const { auditId } = useParams();

  const [nameAudit, setNameAudit] = useState<any>(null);

  const [currentLanguage, setCurrentLanguage] = useState<any>(null);
  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [loadingLanguages, setLoadingLanguages] = useState<boolean>(true);

  const [currentTemplate, setCurrentTemplate] = useState<any>(null);

  const [currentCompany, setCurrentCompany] = useState<any>(null);

  const [currentClient, setCurrentClient] = useState<any>(null);

  const [currentCollaborators, setCurrentCollaborators] = useState<any>(null);

  const [startDate, setStartDate] = useState<Dayjs | any>(null);
  const [endDate, setEndDate] = useState<Dayjs | any>(null);
  const [reportingDate, setReportingDate] = useState<Dayjs | any>(null);

  const [scope, setScope] = useState<any>(null);

  const fetchAuditData = async () => {
    if (!auditId) return;
    try {
      const dataAudit = await getAuditById(auditId);
      if (dataAudit) {
        setNameAudit(dataAudit.datas.name);
        setCurrentLanguage(dataAudit.datas.language);
        setCurrentTemplate(dataAudit.datas.template.name);
        setCurrentCompany(dataAudit.datas.company.name);
        setCurrentClient(dataAudit.datas.client.email);
        setCurrentCollaborators(dataAudit.datas.collaborators[0].firstname);
        setStartDate(dataAudit.datas.date_start);
        setEndDate(dataAudit.datas.date_end);
        setReportingDate(dataAudit.datas.date);
        setScope(dataAudit.datas.scope[0].name);
      } else {
        console.error("No audit data found");
      }
    } catch (error) {
      console.error("Error fetching audit data:", error);
    }
  };

  useEffect(() => {
    if (auditId) {
      fetchAuditData();
    }
  }, [auditId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataLanguage = await getLanguages();
        const languageNames = dataLanguage.datas.map(
          (item: LanguagesData, index: number) => ({
            id: index,
            value: item.language,
          })
        );
        setLanguages(languageNames);
        setLoadingLanguages(false);
      } catch (err) {
        setLoadingLanguages(false);
      }
    };
    fetchData();
  }, []);

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
