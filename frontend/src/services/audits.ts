const API_URL = 'https://localhost:8443/api/';

const networkError = new Error('Network response was not ok');

export type Finding = {
  identifier: number;
  title: string;
  description: string;
  observation: string;
  remediation: string;
  references: string[];
  cwes: string[];
  cvssv3: string;
  status: number;
  customFields: string[];
  _id: string;
  paragraphs: string[];
};

export type Detail = {
  customFields: string[];
  cwes: string[];
  locale: string;
  title: string;
  references: string[];
};

export type FindingByLocale = {
  cvssv3: string;
  _id: string;
  detail: Detail;
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

//{"status":"success","datas":{"_id":"66c79cbd521d8a947124b115","name":"HOALAAAAAA","auditType":"tipo2","collaborators":[{"_id":"66bcfe7e7591413e4b9881a7","username":"testing","firstname":"testing","lastname":"testing","email":"testing@test.com","phone":"123123123","role":"user"},{"_id":"66bcfdb27591413e4b987bf5","username":"camilo2","firstname":"camilo2","lastname":"camilo2","email":"camilo2@gmail.com","phone":"123123123","role":"admin"}],"reviewers":[],"language":"Español","creator":{"_id":"669adc9b1c7c2bd53fecdafd","username":"camilo","firstname":"camilo","lastname":"camilo","role":"admin"},"sections":[],"customFields":[],"sortFindings":[],"state":"EDIT","approvals":[],"type":"default","scope":[{"name":"asdasd","hosts":[]},{"name":"asdasd","hosts":[]},{"name":"assdasd","hosts":[]}],"findings":[],"createdAt":"2024-08-22T20:17:01.657Z","updatedAt":"2024-08-28T00:49:34.611Z","__v":0,"template":{"_id":"66bb89353b73b982bec9c982","name":"template1","ext":"docx","createdAt":"2024-08-13T16:26:29.869Z","updatedAt":"2024-08-13T16:26:29.869Z","__v":0},"client":{"_id":"66bb89b73b73b982bec9c9c3","email":"pepe@pepe.cl","company":"66bb89a63b73b982bec9c9bd","lastname":"flores","firstname":"pepe","phone":"123123123","cell":"123123123","title":"jefe","createdAt":"2024-08-13T16:28:39.934Z","updatedAt":"2024-08-13T16:28:39.934Z","__v":0},"company":{"_id":"66bb89a63b73b982bec9c9bd","name":"NTG","shortName":"ntg","createdAt":"2024-08-13T16:28:22.360Z","updatedAt":"2024-08-13T16:28:39.927Z","__v":0},"date":"2024-08-12","date_end":"2024-08-15","date_start":"2024-08-07"}}
export type AuditById = {
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
  };
  sections: string[];
  customFields: string[];
  sortFindings: string[];
  scope: {
    name: string;
    hosts: string[];
  }[];
  findings: string[];
  date_end: string;
  date_start: string;
};

export type NewAudit = {
  auditType: string;
  name: string;
  language: string;
  type: string;
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
};

export type Client = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  cell: string;
  title: string;
};

export const createAudit = async (
  audit: NewAudit,
): Promise<{
  status: string;
  datas: { message: string; audit: Audit };
}> => {
  try {
    const response = await fetch(`${API_URL}audits`, {
      method: 'POST',
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

//{"status":"success","datas":{"_id":"66bb89693b73b982bec9c99d","name":"audit1","auditType":"tipo1","collaborators":[],"reviewers":[],"language":"es_CL","template":{"_id":"66bb89353b73b982bec9c982","name":"template1","ext":"docx","createdAt":"2024-08-13T16:26:29.869Z","updatedAt":"2024-08-13T16:26:29.869Z","__v":0},"creator":{"_id":"669adc9b1c7c2bd53fecdafd","username":"camilo","firstname":"camilo","lastname":"camilo","role":"admin"},"sections":[],"customFields":[],"sortFindings":[],"state":"EDIT","approvals":[],"type":"default","scope":[],"findings":[],"createdAt":"2024-08-13T16:27:21.516Z","updatedAt":"2024-08-13T16:27:21.516Z","__v":0}}
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
): Promise<{ status: string; datas: Finding[] }> => {
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
