import dayjs, { Dayjs } from 'dayjs';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DayPicker from '../../../../components/button/DayPicker';
import SelectDropdown from '../../../../components/dropdown/SelectDropdown';
import SimpleInput from '../../../../components/input/SimpleInput';
import TextArea from '../../../../components/text/TextArea';
import type {
  Client,
  Company,
  Language,
  Template,
  User as Collaborator,
} from '../../../../services/audits';
import {
  getAuditById,
  getClients,
  getCollaborators,
  getCompanies,
  getLanguages,
  getTemplates,
} from '../../../../services/audits';
import { GeneralDivWrapper } from './GeneralDivWrapper';

type ListItem = {
  id: number;
  value: string;
  label?: string;
};

export const General = () => {
  const { auditId } = useParams();

  const [nameAudit, setNameAudit] = useState<string>('');

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

  const [scope, setScope] = useState<string | string[]>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataLanguage = await getLanguages();
        const languagesName = dataLanguage.datas.map(
          (item: Language, index: number): ListItem => ({
            id: index,
            value: item.locale,
            label: item.language,
          }),
        );
        setLanguages(languagesName);
        setLoadingLanguages(false);

        const dataTemplates = await getTemplates();
        const templatesName = dataTemplates.datas.map(
          (item: Template, index: number) => ({
            id: index,
            value: item.name,
            label: item.name,
          }),
        );

        setTemplates(templatesName);
        setLoadingTemplates(false);

        const dataCompany = await getCompanies();
        const companiesName = dataCompany.datas.map(
          (item: Company, index: number): ListItem => ({
            id: index,
            value: item.name,
            label: item.name,
          }),
        );
        setCompanies(companiesName);
        setLoadingCompanies(false);

        const dataClients = await getClients();
        const clientsName = dataClients.datas.map(
          (item: Client, index: number): ListItem => ({
            id: index,
            value: item._id,
            label: item.email,
          }),
        );
        setClients(clientsName);
        setLoadingClients(false);

        const dataCollaborators = await getCollaborators();
        const collaboratorsName = dataCollaborators.datas.map(
          (item: Collaborator, index: number): ListItem => ({
            id: index,
            value: `${item._id}`,
            label: `${item.firstname} ${item.lastname}`,
          }),
        );
        setCollaborators(collaboratorsName);
        setLoadingCollaborators(false);
      } catch (err) {
        setLoadingLanguages(false);
      }
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchAuditData = async () => {
      if (!auditId) {
        return;
      }

      try {
        const dataAudit = await getAuditById(auditId);
        setNameAudit(dataAudit.datas.name);

        const selectedLanguage =
          languages.find(item => item.value === dataAudit.datas.language) ??
          null;
        setCurrentLanguage(selectedLanguage);

        const selectedTemplate = templates.find(
          item => item.value === dataAudit.datas.template.name,
        );
        setCurrentTemplate(selectedTemplate ?? null);

        const selectedCompany = companies.find(
          item => item.value === dataAudit.datas.company?.name,
        );
        setCurrentCompany(selectedCompany ?? null);

        const selectedClient = clients.find(
          item => item.value === dataAudit.datas.client._id,
        );
        setCurrentClient(selectedClient ?? null);

        const selectedCollaborator =
          collaborators.find(
            item => item.value === dataAudit.datas.creator._id,
          ) ?? null;
        setCurrentCollaborators(selectedCollaborator);

        setStartDate(dayjs(dataAudit.datas.date_start));
        setEndDate(dayjs(dataAudit.datas.date_end));
        setReportingDate(dayjs(dataAudit.datas.date));

        setScope(dataAudit.datas.scope.map(item => item.name).join('\n'));
      } catch (error) {
        console.error('Error fetching audit data:', error);
      }
    };
    if (
      auditId &&
      languages.length > 0 &&
      templates.length > 0 &&
      companies.length > 0 &&
      clients.length > 0 &&
      collaborators.length > 0
    ) {
      fetchAuditData().catch(console.error);
    }
  }, [auditId, languages, templates, companies, clients, collaborators]);

  return (
    <GeneralDivWrapper>
      <div className="flex flex-col">
        <SimpleInput
          id="name"
          label={t('name')}
          name="name"
          onChange={setNameAudit}
          placeholder="Search"
          type="text"
          value={nameAudit}
        />
      </div>

      <div className="flex space-x-6">
        <div className="w-1/2">
          {!loadingLanguages ? (
            <SelectDropdown
              items={languages}
              onChange={setCurrentLanguage}
              selected={currentLanguage}
              title={t('language')}
            />
          ) : null}
        </div>
        <div className="w-1/2">
          {!loadingTemplates ? (
            <SelectDropdown
              items={templates}
              onChange={setCurrentTemplate}
              selected={currentTemplate}
              title={t('template')}
            />
          ) : null}
        </div>
      </div>

      <div className="flex space-x-6">
        <div className="w-1/2">
          {!loadingCompanies ? (
            <SelectDropdown
              items={companies}
              onChange={setCurrentCompany}
              selected={currentCompany}
              title={t('company')}
            />
          ) : null}
        </div>
        <div className="w-1/2">
          {!loadingClients ? (
            <SelectDropdown
              items={clients}
              onChange={setCurrentClient}
              selected={currentClient}
              title={t('client')}
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col">
        {!loadingCollaborators ? (
          <SelectDropdown
            items={collaborators}
            onChange={setCurrentCollaborators}
            selected={currentCollaborators}
            title={t('collaborators')}
          />
        ) : null}
      </div>

      <div className="flex space-x-6">
        <div className="w-1/3">
          <DayPicker
            label={t('startDate')}
            onChange={setStartDate}
            selectedDay={startDate}
          />
        </div>
        <div className="w-1/3">
          <DayPicker
            label={t('endDate')}
            onChange={setEndDate}
            selectedDay={endDate}
          />
        </div>
        <div className="w-1/3">
          <DayPicker
            label={t('reportingDate')}
            onChange={setReportingDate}
            selectedDay={reportingDate}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <TextArea
          id="references"
          label={t('auditScope')}
          name="references"
          onChange={setScope}
          placeholder=""
          rows={4}
          value={scope}
        />
      </div>
    </GeneralDivWrapper>
  );
};
