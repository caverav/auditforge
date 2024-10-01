const API_URL = `${import.meta.env.VITE_API_URL}/api/`;

type NewCollaborator = {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  role: string;
  totpenabled: boolean;
  username: string;
  enabled?: boolean;
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
  _id?: string;
  name: string;
  shortName: string;
  logo: string;
};

type Company = {
  _id: string;
  name: string;
  shortName: string;
  logo: string;
};

export type NewClient = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  phone: string;
  cell: string;
  company: NewCompany | null;
};

export type Client = {
  _id: string;
  company: string;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  phone: string;
  cell: string;
};

type NewTemplate = {
  _id?: string;
  name: string;
  ext: string;
  file: string;
};

type NewLanguage = { language: string; locale: string };

export type NewAuditType = {
  name: string;
  hidden: string[];
  sections: string[]; // temporal
  stage: string;
  templates: { template: string; locale: string }[];
};

export type AuditType = {
  _id: string;
  name: string;
  hidden: string[];
  sections: string[]; // temporal
  stage: string;
  templates: { template: string; locale: string }[];
};

type OptionData = {
  locale: string;
  value: string;
};

type TextDataChild = {
  locale: string;
  value: string | string[];
};

type TextData = {
  locale: string;
  value: string | TextDataChild;
};

export type AddCustomFieldType = {
  label: string;
  fieldType: string;
  display: string;
  displaySub: string;
  size: number;
  offset: number;
  required: boolean;
  description: string;
  text: TextData[];
  options: OptionData[];
  position: number;
};

export type AddCustomFieldTypeResponse = {
  label: string;
  fieldType: string;
  display: string;
  displaySub: string;
  size: number;
  offset: number;
  required: boolean;
  description: string;
  text: TextData[];
  options: OptionData[];
  position: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GetCustomFieldType = {
  _id: string;
  label: string;
  fieldType: string;
  display: string;
  displaySub: string;
  size: number;
  offset: number;
  required: boolean;
  description: string;
  text: TextData[];
  options: OptionData[];
};

export type UpdateCustomFieldType = {
  _id: string;
  label: string;
  fieldType: string;
  display: string;
  displaySub: string;
  size: number;
  offset: number;
  required: boolean;
  description: string;
  text: OptionData[];
  options: OptionData[];
  position: number;
};

const networkErrorMsg = 'Network response was not ok';

export const getRoles = async (): Promise<{
  status: string;
  datas: string[];
}> => {
  try {
    const response = await fetch(`${API_URL}data/roles`, {
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

export const updateCollaborator = async (
  collaborator: NewCollaborator,
): Promise<{ status: string; datas: string }> => {
  try {
    const { _id, ...collaboratorWithoutId } = collaborator;

    const response = await fetch(`${API_URL}users/${_id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collaboratorWithoutId),
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

export const getCompanies = async (): Promise<{
  status: string;
  datas: Company[];
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

export const updateCompany = async (
  company: NewCompany,
): Promise<{ status: string; datas: string }> => {
  try {
    const { _id, ...companyWithoutId } = company;

    const response = await fetch(`${API_URL}companies/${_id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companyWithoutId),
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

export const deleteCompany = async (
  companyId: string,
): Promise<{ status: string; datas: string }> => {
  try {
    const response = await fetch(`${API_URL}companies/${companyId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
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
  datas: Client[];
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

export const updateClient = async (
  client: NewClient,
): Promise<{ status: string; datas: string }> => {
  const { _id, ...clientWhitoutId } = client;

  try {
    const response = await fetch(`${API_URL}clients/${_id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientWhitoutId),
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

export const deleteClient = async (
  clientId: string,
): Promise<{ status: string; datas: string }> => {
  try {
    const response = await fetch(`${API_URL}clients/${clientId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
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

export const createTemplate = async (
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

export const updateTemplate = async (
  template: NewTemplate,
): Promise<{ status: string; datas: string }> => {
  try {
    const { _id, ...TemplateWithoutId } = template;

    const response = await fetch(`${API_URL}templates/${_id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TemplateWithoutId),
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

export const getAuditTypes = async (): Promise<{
  status: string;
  datas: AuditType[];
}> => {
  try {
    const response = await fetch(`${API_URL}data/audit-types`, {
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

export const updateAuditTypes = async (
  auditTypes: AuditType[],
): Promise<{
  status: string;
  datas: string;
}> => {
  try {
    const response = await fetch(`${API_URL}data/audit-types`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auditTypes),
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

export const deleteTemplate = async (
  templateId: string,
): Promise<{ status: string; datas: string }> => {
  try {
    const response = await fetch(`${API_URL}templates/${templateId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
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

export const downloadTemplate = (templateId: string, window: Window): void => {
  window.open(`${API_URL}templates/download/${templateId}`, '_blank');
};

export const getCustomField = async (): Promise<{
  status: string;
  datas: GetCustomFieldType[];
}> => {
  try {
    const response = await fetch(`${API_URL}data/custom-fields`, {
      credentials: 'include',
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

export const addCustomField = async (
  customField: AddCustomFieldType,
): Promise<{
  status: string;
  datas: AddCustomFieldTypeResponse;
}> => {
  try {
    const response = await fetch(`${API_URL}data/custom-fields`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customField),
    });
    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText).datas;
      if (errorData === 'Custom Field already exists') {
        throw new Error(errorData);
      } else {
        throw new Error(networkErrorMsg);
      }
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const updateCustomField = async (
  customFields: UpdateCustomFieldType[],
): Promise<{
  status: string;
  datas: string;
}> => {
  try {
    const response = await fetch(`${API_URL}data/custom-fields/`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customFields),
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
