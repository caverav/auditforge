import dayjs, { Dayjs } from 'dayjs';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DayPicker from '../../../../components/button/DayPicker';
import MultiSelectDropdown from '../../../../components/dropdown/MultiSelectDropdown';
import SelectDropdown from '../../../../components/dropdown/SelectDropdown';
import SimpleInput from '../../../../components/input/SimpleInput';
import TextArea from '../../../../components/text/TextArea';
import TopMenu from '../../../../components/topmenu/Topmenu';
import type {
  AuditById,
  Client,
  Company,
  Language,
  Template,
  UpdateAudit,
  User as Collaborator,
} from '../../../../services/audits';
import {
  getAuditById,
  getClients,
  getCollaborators,
  getCompanies,
  getLanguages,
  getTemplates,
  updateAudit,
} from '../../../../services/audits';
import { GeneralDivWrapper } from './GeneralDivWrapper';

type ListItem = {
  id: number;
  value: string;
  label?: string;
};

export const General = () => {
  const { auditId } = useParams();
  const [dataAudit, setDataAudit] = useState<AuditById>();

  const [nameAudit, setNameAudit] = useState<string>('');
  const [auditType, setAuditType] = useState<string>('');

  const [, setLanguages] = useState<Language[]>([]);
  const [languageOptions, setLanguageOptions] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem | null>(null);
  const [loadingLanguages, setLoadingLanguages] = useState<boolean>(true);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateOptions, setTemplateOptions] = useState<ListItem[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<ListItem | null>(null);
  const [loadingTemplates, setLoadingTemplates] = useState<boolean>(true);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyOptions, setCompanyOptions] = useState<ListItem[]>([]);
  const [currentCompany, setCurrentCompany] = useState<ListItem | null>(null);
  const [loadingCompanies, setLoadingCompanies] = useState<boolean>(false);

  const [clients, setClients] = useState<Client[]>([]);
  const [clientOptions, setClientOptions] = useState<ListItem[]>([]);
  const [currentClient, setCurrentClient] = useState<ListItem | null>(null);
  const [loadingClients, setLoadingClients] = useState<boolean>(false);

  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [collaboratorOptions, setCollaboratorOptions] = useState<ListItem[]>(
    [],
  );
  const [currentCollaborators, setCurrentCollaborators] = useState<ListItem[]>(
    [],
  );
  const [loadingCollaborators, setLoadingCollaborators] =
    useState<boolean>(true);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [reportingDate, setReportingDate] = useState<Dayjs | null>(null);

  const [scope, setScope] = useState<string[]>([]);

  const changeScope = (value: string) => {
    setScope(value.split('\n'));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataLanguages = await getLanguages();
        setLanguages(dataLanguages.datas);
        const languageNames = dataLanguages.datas.map(
          (item: Language, index: number): ListItem => ({
            id: index,
            value: item.locale,
            label: item.language,
          }),
        );
        setLanguageOptions(languageNames);
        setLoadingLanguages(false);

        const dataTemplates = await getTemplates();
        setTemplates(dataTemplates.datas);
        const templateNames = dataTemplates.datas.map(
          (item: Template, index: number): ListItem => ({
            id: index,
            value: item.name,
            label: item.name,
          }),
        );
        setTemplateOptions(templateNames);
        setLoadingTemplates(false);

        const dataCompanies = await getCompanies();
        setCompanies(dataCompanies.datas);
        const companyNames = dataCompanies.datas.map(
          (item: Company, index: number): ListItem => ({
            id: index,
            value: item._id,
            label: item.name,
          }),
        );
        setCompanyOptions(companyNames);
        setLoadingCompanies(false);

        const dataClients = await getClients();
        setClients(dataClients.datas);
        const clientNames = dataClients.datas.map(
          (item: Client, index: number): ListItem => ({
            id: index,
            value: item._id,
            label: item.email,
          }),
        );
        setClientOptions(clientNames);
        setLoadingClients(false);

        const dataCollaborators = await getCollaborators();
        setCollaborators(dataCollaborators.datas);
        const collaboratorNames = dataCollaborators.datas.map(
          (item: Collaborator, index: number): ListItem => ({
            id: index,
            value: `${item._id}`,
            label: `${item.firstname} ${item.lastname}`,
          }),
        );
        setCollaboratorOptions(collaboratorNames);
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
        setDataAudit(dataAudit.datas);

        setNameAudit(dataAudit.datas.name);
        setAuditType(dataAudit.datas.auditType);

        const selectedLanguage =
          languageOptions.find(
            item => item.value === dataAudit.datas.language,
          ) ?? null;
        setCurrentLanguage(selectedLanguage);

        const selectedTemplate = templateOptions.find(
          item => item.value === dataAudit.datas.template.name,
        );
        setCurrentTemplate(selectedTemplate ?? null);

        const selectedCompany = companyOptions.find(
          item => item.value === dataAudit.datas.company?._id,
        );
        setCurrentCompany(selectedCompany ?? null);

        const selectedClient = clientOptions.find(
          item => item.value === dataAudit.datas.client?._id,
        );
        setCurrentClient(selectedClient ?? null);

        const selectedCollaborators = dataAudit.datas.collaborators.map(
          (item: Collaborator, index: number): ListItem => ({
            id: index,
            value: item._id,
            label: `${item.firstname} ${item.lastname}`,
          }),
        );
        setCurrentCollaborators(selectedCollaborators);

        setStartDate(dayjs(dataAudit.datas.date_start));
        setEndDate(dayjs(dataAudit.datas.date_end));
        setReportingDate(dayjs(dataAudit.datas.date));

        setScope(dataAudit.datas.scope.map(item => item.name));
      } catch (error) {
        console.error('Error fetching audit data:', error);
      }
    };
    if (
      auditId &&
      languageOptions.length > 0 &&
      templateOptions.length > 0 &&
      companyOptions.length > 0 &&
      clientOptions.length > 0 &&
      collaboratorOptions.length > 0
    ) {
      fetchAuditData().catch(console.error);
    }
  }, [
    auditId,
    languageOptions,
    templateOptions,
    companyOptions,
    clientOptions,
    collaboratorOptions,
  ]);

  const handleSaveButton = async () => {
    if (!auditId) {
      console.error('No audit ID available');
      return;
    }

    const clientData = clients.find(
      clients => clients._id === currentClient?.value,
    );

    const collaboratorsData = collaborators.filter(collaborator =>
      currentCollaborators.find(item => item.value === collaborator._id),
    );
    const companyData = companies.find(
      company => company._id === currentCompany?.value,
    );

    const templateData = templates.find(
      template => template.name === currentTemplate?.value,
    );

    const updatedAudit: UpdateAudit = {
      _id: auditId,
      auditType,
      name: nameAudit,
      language: currentLanguage?.value ?? '',
      client: clientData
        ? {
            _id: clientData._id,
            company: {
              _id: currentCompany?.value ?? '',
              name: clientData.company.name,
            },
            email: clientData.email,
            firstname: clientData.firstname,
            lastname: clientData.lastname,
          }
        : {
            _id: '',
            company: { _id: '', name: '' },
            email: '',
            firstname: '',
            lastname: '',
          },
      collaborators: collaboratorsData.map(collaborator => ({
        _id: collaborator._id,
        firstname: collaborator.firstname,
        lastname: collaborator.lastname,
        username: collaborator.username,
      })),
      company: companyData
        ? {
            __v: 0,
            _id: companyData._id,
            createdAt: dataAudit?.company?.createdAt ?? '',
            name: companyData.name,
            shortName: companyData.shortName,
            updatedAt: dataAudit?.company?.updatedAt ?? '',
          }
        : {
            __v: 0,
            _id: '',
            name: '',
            shortName: '',
            createdAt: '',
            updatedAt: '',
          },
      creator: {
        _id: dataAudit?.creator._id ?? '',
        firstname: dataAudit?.creator.firstname ?? '',
        lastname: dataAudit?.creator.lastname ?? '',
        username: dataAudit?.creator.username ?? '',
      },
      customFields: [],
      date: reportingDate ? reportingDate.toISOString() : '',
      date_end: endDate ? endDate.toISOString() : '',
      date_start: startDate ? startDate.toISOString() : '',
      reviewers: [],
      scope,
      template: templateData?._id ?? '',
    };

    try {
      await updateAudit(auditId, updatedAudit);
    } catch (error) {
      console.error('Error updating audit:', error);
    }
  };

  return (
    <GeneralDivWrapper>
      <TopMenu
        auditName={nameAudit}
        auditType={auditType}
        onSave={handleSaveButton}
      />
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
              items={languageOptions}
              onChange={setCurrentLanguage}
              selected={currentLanguage}
              title={t('language')}
            />
          ) : null}
        </div>
        <div className="w-1/2">
          {!loadingTemplates ? (
            <SelectDropdown
              items={templateOptions}
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
              items={companyOptions}
              onChange={setCurrentCompany}
              selected={currentCompany}
              title={t('company')}
            />
          ) : null}
        </div>
        <div className="w-1/2">
          {!loadingClients ? (
            <SelectDropdown
              items={clientOptions}
              onChange={setCurrentClient}
              selected={currentClient}
              title={t('client')}
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col">
        {!loadingCollaborators ? (
          <MultiSelectDropdown
            items={collaboratorOptions}
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
          onChange={changeScope}
          placeholder=""
          rows={4}
          value={scope.join('\n')}
        />
      </div>
    </GeneralDivWrapper>
  );
};
