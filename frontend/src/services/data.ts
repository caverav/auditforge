const API_URL = 'https://localhost:4242/api/';

type NewCollaborator = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  role: string;
  totpenabled: boolean;
  username: string;
};

type Collaborator = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  role: string;
  totpenabled: boolean;
  enabled: boolean;
  username: string;
  _id: string;
};

type NewCompany = {
  name: string;
  shortname: string;
  logo: string;
};

type NewClient = {
  company: string;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  phone: string;
  cell: string;
};

type NewTemplate = {
  name: string;
  ext: string;
  file: string;
};

type NewLanguage = { language: string; locale: string };

type NewAuditType = {
  name: string;
  hidden: string[];
  sections: string[]; // temporal
  stage: string;
  templates: { template: string; locale: string }[];
};

type AuditType = {
  _id: string;
  name: string;
  hidden: string[];
  sections: string[]; // temporal
  stage: string;
  templates: { template: string; locale: string }[];
};

const networkErrorMsg = 'Network response was not ok';

export const getCollaborators = async (): Promise<{
  status: string;
  datas: Collaborator[];
}> => {
  try {
    const response = await fetch(`${API_URL}users`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const createCollaborator = async (
  collab: NewCollaborator,
): Promise<{
  status: string;
  datas: string;
}> => {
  try {
    const response = await fetch(`${API_URL}users`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collab),
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getCompanies = async (): Promise<{
  status: string;
  datas: NewCompany[];
}> => {
  try {
    const response = await fetch(`${API_URL}companies`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const createCompany = async (
  company: NewCompany,
): Promise<{
  status: string;
  datas: { _id: string; name: string };
}> => {
  try {
    const response = await fetch(`${API_URL}companies`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    });

    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getClients = async (): Promise<{
  status: string;
  datas: NewClient[];
}> => {
  try {
    const response = await fetch(`${API_URL}clients`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const createClient = async (
  client: NewClient,
): Promise<{
  status: string;
  datas: { _id: string; email: string; firstname: string; lastname: string }[];
}> => {
  try {
    const response = await fetch(`${API_URL}clients`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getTemplates = async (): Promise<{
  status: string;
  datas: { _id: string; name: string; ext: string }[];
}> => {
  try {
    const response = await fetch(`${API_URL}templates`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const createTemplates = async (
  template: NewTemplate,
): Promise<{
  status: string;
  datas: { _id: string; name: string; ext: string }[];
}> => {
  try {
    const response = await fetch(`${API_URL}templates`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template),
    });

    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

/**
 * Custom data: Languages
 */

export const getLanguages = async (): Promise<{
  status: string;
  datas: NewLanguage[];
}> => {
  try {
    const response = await fetch(`${API_URL}data/languages`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const createLanguage = async (
  language: NewLanguage,
): Promise<{
  status: string;
  datas: { language: string; locale: string; _id: string };
}> => {
  try {
    const response = await fetch(`${API_URL}data/languages`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(language),
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const updateLanguages = async (
  language: NewLanguage[],
): Promise<{
  status: string;
  datas: string;
}> => {
  try {
    const response = await fetch(`${API_URL}data/languages`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(language),
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

/**
 * Custom data: Custom sections
 */

export const getCustomSections = async (): Promise<{
  status: string;
  datas: { field: string; name: string; icon: string }[];
}> => {
  try {
    const response = await fetch(`${API_URL}data/sections`, {
      credentials: 'include',
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

/**
 * Custom data: Audit types
 */

export const createAuditType = async (
  auditType: NewAuditType,
): Promise<{
  status: string;
  datas: AuditType[];
}> => {
  try {
    const response = await fetch(`${API_URL}data/audit-types`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auditType),
    }); // Incluir token
    if (!response.ok) {
      throw new Error(networkErrorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};
