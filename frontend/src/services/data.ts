const API_URL = 'https://localhost:4242/api/';

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
  datas: { _id: string; name: string; ext: string; file: string }[];
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
