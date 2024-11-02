import { getVulnerabilities } from './vulnerabilities';
const API_URL = `${import.meta.env.VITE_API_URL}/api/`;

const networkError = new Error('Network response was not ok');

export type Finding = {
  identifier: number;
  title: string;
  description: string;
  observation: string;
  remediation: string;
  remediationComplexity: number;
  priority: number;
  references: string[];
  cwes: string[];
  cvssv3: string;
  status: number;
  customFields: string[];
  _id: string;
  paragraphs: string[];
};

type EditFinding = {
  identifier: number;
  title: string;
  references: string[];
  cwes: string[];
  status: number;
  _id: string;
  paragraphs: string[];
  customFields: string[];
  description?: string;
  observation?: string;
  poc?: string;
  remediation?: string;
  cvssv3?: string;
  remediationComplexity?: number | '';
  priority?: number | '';
  scope?: string;
  vulnType?: string;
};

export type Detail = {
  locale: string;
  title: string;
  description: string;
  observation: string;
  remediation: string;
  cwes: string[];
  references: string[];
  customFields: string[];
  vulnType?: string;
};

export type FindingByLocale = {
  cvssv3: string;
  detail: Detail;
  _id: string;
  category?: string;
};

export type AuditSection = {
  field: string;
  name: string;
  _id: string;
  customFields: string[];
  icon?: string;
};

export type Audit = {
  _id: string;
  name: string;
  auditType: string;
  language: string;
  company:
    | {
        _id: string;
        name: string;
      }
    | undefined;
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
};

export type AuditById = {
  _id: string;
  name: string;
  auditType: string;
  language: string;
  company:
    | {
        _id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        shortname: string;
      }
    | undefined;
  collaborators: User[];
  date: string;
  creator: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    email: string;
  };
  state: string;
  type: string;
  connected: string[];
  createdAt: string;
  updatedAt: string;
  template: {
    _id: string;
    name: string;
    ext: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  client: {
    _id: string;
    email: string;
    company: string;
    lastname: string;
    firstname: string;
    phone: string;
    cell: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  } | null;
  sections: AuditSection[];
  customFields: string[];
  sortFindings: string[];
  scope: {
    name: string;
    hosts: string[];
  }[];
  findings: Finding[];
  date_end: string;
  date_start: string;
};

export type UpdateAuditCustomFields = {
  customFields: {
    customField: {
      description: string;
      display: string;
      displaySub: string;
      fieldType: string;
      label: string;
      offset: number;
      options: {
        locale: string;
        value: string;
      }[];
      required: boolean;
      size: number;
      _id: string;
    };
    text: string | string[];
  }[];
  field: string;
  name: string;
  _id: string;
};

export type SectionCustomField = {
  description: string;
  display: string;
  displaySub: string;
  fieldType: string;
  label: string;
  offset: number;
  options: {
    locale: string;
    value: string;
  }[];
  required: boolean;
  size: number;
  _id: string;
};

export type AuditSectionById = {
  _id: string;
  field: string;
  name: string;
  customFields: {
    customField: SectionCustomField;
    text: string | string[];
  }[];
};

export type NewAudit = {
  auditType: string;
  name: string;
  language: string;
  type: string;
};

export type UpdateAudit = {
  _id: string;
  auditType: string;
  client?: {
    _id: string;
    company: {
      _id: string;
      name: string;
    };
    email: string;
    firstname: string;
    lastname: string;
  };
  collaborators: {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
  }[];
  company: {
    __v: number;
    _id: string;
    createdAt: string;
    name: string;
    shortName: string;
    updatedAt: string;
  };
  creator: {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
  };
  customFields: string[];
  date: string;
  date_end: string;
  date_start: string;
  language: string;
  name: string;
  reviewers: string[];
  scope: string[];
  template: string;
};

export type Type = {
  name: string;
  templates: {
    template: string;
    locale: string;
  }[];
  sections: string[];
  hidden: string[];
  stage: string;
};

export type Template = {
  _id: string;
  name: string;
  ext: string;
};

export type Language = {
  language: string;
  locale: string;
};

export type Company = {
  _id: string;
  name: string;
  shortName: string;
};

export type User = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  role: string;
  totpEnabled: boolean;
  enabled: boolean;
  email?: string;
  phone?: string;
};

export type UserById = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
};

export type Client = {
  _id: string;
  email: string;
  company: {
    name: string;
  };
  lastname: string;
  firstname: string;
  phone: string;
  title: string;
};

export type AuditFinding = {
  title: string;
  vulnType: string;
  references: string[];
  cwes: string[];
  cvssv3: string;
  category?: string;
  customFields: string[];
};

export const createAudit = async (
  audit: NewAudit,
): Promise<{
  status: string;
  datas: { message: string; audit: Audit } | string;
}> => {
  try {
    const response = await fetch(`${API_URL}audits`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(audit),
    });
    if (!response.ok) {
      const errorResponse = await response.json();

      throw new Error(errorResponse.datas);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const updateAudit = async (
  auditId: string,
  audit: UpdateAudit,
): Promise<{
  status: string;
  datas: { message: string; audit: Audit };
}> => {
  try {
    const response = await fetch(`${API_URL}audits/${auditId}/general`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(audit),
    });
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getTypes = async (): Promise<{
  status: string;
  datas: Type[];
}> => {
  try {
    const response = await fetch(`${API_URL}data/audit-types`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getLanguages = async (): Promise<{
  status: string;
  datas: Language[];
}> => {
  try {
    const response = await fetch(`${API_URL}data/languages`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getCompanies = async (): Promise<{
  status: string;
  datas: Company[];
}> => {
  try {
    const response = await fetch(`${API_URL}companies`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getAudits = async (): Promise<{
  status: string;
  datas: Audit[];
}> => {
  try {
    const response = await fetch(`${API_URL}audits`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getAuditById = async (
  auditId: string | undefined,
): Promise<{ status: string; datas: AuditById }> => {
  try {
    const response = await fetch(`${API_URL}audits/${auditId}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getAuditSectionById = async (
  auditId: string | undefined,
  sectionId: string | undefined,
): Promise<{ status: string; datas: AuditSectionById }> => {
  try {
    const response = await fetch(
      `${API_URL}audits/${auditId}/sections/${sectionId}`,
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      },
    );
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const updateAuditSectionById = async (
  auditId: string | undefined,
  sectionId: string | undefined,
  auditSections: UpdateAuditCustomFields,
): Promise<{ status: string; datas: AuditSectionById }> => {
  try {
    const response = await fetch(
      `${API_URL}audits/${auditId}/sections/${sectionId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditSections),
      },
    );
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};
export const getAuditColumns = async (): Promise<
  {
    header: string;
    accessor: string;
    sortable: boolean;
    filterable: boolean;
  }[]
> => {
  try {
    const response = await fetch(`${API_URL}audits`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) {
      throw networkError;
    }
    const data = await response.json();
    const keys = Object.keys(data.datas[0]);
    return keys.map((key: string) => ({
      header: key,
      accessor: key,
      sortable: true,
      filterable: true,
    }));
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const fetchUsername = async (): Promise<{
  status: string;
  datas: User;
}> => {
  const res = await fetch(`${API_URL}users/me`, {
    credentials: 'include',
  });
  return res.json();
};

export const getCollaborators = async (): Promise<{
  status: string;
  datas: User[];
}> => {
  try {
    const response = await fetch(`${API_URL}users`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getClients = async (): Promise<{
  status: string;
  datas: Client[];
}> => {
  try {
    const response = await fetch(`${API_URL}clients`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getTemplates = async (): Promise<{
  status: string;
  datas: Template[];
}> => {
  try {
    const response = await fetch(`${API_URL}templates`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getVulnByLanguage = async (
  locale: string,
): Promise<{ status: string; datas: FindingByLocale[] }> => {
  try {
    const response = await fetch(`${API_URL}vulnerabilities/${locale}`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const generateReport = (auditId: string, window: Window): void => {
  window.open(`${API_URL}audits/${auditId}/generate`, '_blank');
};

export const deleteAudit = async (
  id: string,
): Promise<{ status: string; datas: string }> => {
  try {
    const response = await fetch(`${API_URL}audits/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const addVuln = async (
  vulnId: string,
  auditId: string,
  locale: string,
): Promise<{
  status: string;
  datas: string;
}> => {
  try {
    let data;

    try {
      const res = await getVulnerabilities();
      data = res.datas.find(item => item._id === vulnId);
    } catch (error) {
      console.error(error);

      throw error;
    }

    if (!data) {
      throw new Error('Vulnerability not found');
    }

    if (data.details.length === 0) {
      throw new Error('Vulnerability has no details');
    }

    const detailIndex = data.details.findIndex(
      detail => detail.locale === locale,
    );
    if (detailIndex === -1) {
      throw new Error('Locale not found in vulnerability details');
    }

    const response2 = await fetch(`${API_URL}audits/${auditId}/findings`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.details[detailIndex].title,
        vulnType: data.details[detailIndex].vulnType,
        description: data.details[detailIndex].description,
        observation: data.details[detailIndex].observation,
        remediation: data.details[detailIndex].remediation,
        remediationComplexity: data.remediationComplexity,
        priority: data.priority,
        cwes: data.details[detailIndex].cwes,
        references: data.details[detailIndex].references,
        category: data.details[detailIndex].category ?? 'No Category',
        customFields: data.details[detailIndex].customFields,
        cvssv3: data.cvssv3,
      }),
    });
    if (!response2.ok) {
      throw networkError;
    }
    return await response2.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const addFinding = async (
  title: string,
  auditId: string,
): Promise<{
  status: string;
  datas: string;
}> => {
  try {
    const response = await fetch(`${API_URL}audits/${auditId}/findings`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const encryptPDF = async (
  password: string,
  auditId: string,
): Promise<Blob | undefined> => {
  const bodyParam = {
    password,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/audits/${auditId}/generate/pdf`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyParam),
      },
    );

    if (!response.ok) {
      throw new Error('Error generating PDF');
    }
    return await response.blob();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export const getFinding = async (
  auditID: string,
  findingId: string,
): Promise<{
  status: string;
  datas: EditFinding;
}> => {
  try {
    const response = await fetch(
      `${API_URL}audits/${auditID}/findings/${findingId}`,
      {
        credentials: 'include',
      },
    );
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const updateFinding = async (
  auditId: string,
  findingId: string,
  finding: EditFinding,
): Promise<{ status: string; datas: string }> => {
  try {
    const response = await fetch(
      `${API_URL}audits/${auditId}/findings/${findingId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finding),
      },
    );
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const deleteFinding = async (
  auditId: string,
  findingId: string,
): Promise<{ status: string; datas: string }> => {
  try {
    const response = await fetch(
      `${API_URL}audits/${auditId}/findings/${findingId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );
    if (!response.ok) {
      throw networkError;
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};
