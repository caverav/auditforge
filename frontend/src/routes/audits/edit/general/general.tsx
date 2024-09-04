import dayjs, { Dayjs } from 'dayjs';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

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
  const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);

  const [clients, setClients] = useState<Client[]>([]);
  const [clientOptions, setClientOptions] = useState<ListItem[]>([]);
  const [currentClient, setCurrentClient] = useState<ListItem | null>(null);
  const [loadingClients, setLoadingClients] = useState<boolean>(true);

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

  const [loading, setLoading] = useState<boolean>(true);
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
        setCompanyOptions(
          companyNames.length > 0
            ? companyNames
            : [{ id: 0, value: '', label: t('unavailable') }],
        );
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
        setClientOptions(
          clientNames.length > 0
            ? clientNames
            : [{ id: 0, value: '', label: t('unavailable') }],
        );
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
        setLoadingCollaborators(false);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    // filter the clients list by company
    if (currentCompany) {
      setClientOptions(
        clients
          .filter(client => client.company.name === currentCompany.label)
          .map(
            (client: Client, index: number): ListItem => ({
              id: index,
              value: client._id,
              label: client.email,
            }),
          ),
      );
    } else {
      // fetch all clients if no compan
      getClients()
        .then(res => {
          setClients(res.datas);
        })
        .catch(console.error);
    }
  }, [clients, currentCompany]);

  useEffect(() => {
    // automatically select the company if client is selected
    if (currentClient && !currentCompany) {
      setCurrentCompany(
        companyOptions.find(
          company =>
            company.label ===
            clients.filter(client => client._id === currentClient.value)[0]
              .company.name,
        ) ?? null,
      );
    }
  }, [clients, companyOptions, currentClient, currentCompany]);

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
    // Se deshabilita porque no se debe volver a ejecutar cuando se actualizan las opciones, debido a filtrado por compañía de cliente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditId, collaboratorOptions]);

  const getClientData = () => {
    if (!currentClient) {
      return undefined;
    }
    const clientData = clients.find(
      client => client._id === currentClient.value,
    );
    return clientData
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
        };
  };

  const getCollaboratorsData = () => {
    return collaborators
      .filter(collaborator =>
        currentCollaborators.some(item => item.value === collaborator._id),
      )
      .map(collaborator => ({
        _id: collaborator._id,
        firstname: collaborator.firstname,
        lastname: collaborator.lastname,
        username: collaborator.username,
      }));
  };

  const getCompanyData = () => {
    const companyData = companies.find(
      company => company._id === currentCompany?.value,
    );
    return companyData
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
        };
  };

  const handleSaveButton = async () => {
    if (!auditId) {
      console.error('No audit ID available');
      return;
    }

    const updatedAudit: UpdateAudit = {
      _id: auditId,
      auditType,
      name: nameAudit,
      language: currentLanguage?.value ?? '',
      client: getClientData(),
      collaborators: getCollaboratorsData(),
      company: getCompanyData(),
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
      template:
        templates.find(template => template.name === currentTemplate?.value)
          ?._id ?? '',
    };

    try {
      await updateAudit(auditId, updatedAudit);
      toast.success(t('Audit updated successfully'));
    } catch (error) {
      toast.error(t('Error updating audit'));
    }
  };

  return (
    <GeneralDivWrapper>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader" />
          <svg
            className="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        </div>
      ) : (
        <>
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
        </>
      )}
    </GeneralDivWrapper>
  );
};
