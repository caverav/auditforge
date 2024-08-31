const API_URL = "https://localhost:4242/api/";

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
}

type NewCompany = {
  _id?: string;
  name: string;
  shortName: string;
  logo: string;
}

type NewClient = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  phone: string;
  cell: string;
  company: NewCompany | null;
}

type NewTemplate = {
  _id?: string;
  name: string;
  ext: string;
  file: string;
}

export const getRoles = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}data/roles`, {
      credentials: "include",
    }); // Incluir token
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getCollaborators = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}users`, {
      credentials: "include",
    }); // Incluir token
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createCollaborator = async (
  collab: NewCollaborator
): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}users`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collab),
    }); // Incluir token
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateCollaborator = async (
  collaborator: NewCollaborator
): Promise<any> => {
  try {
    const { _id, ...collaboratorWithoutId } = collaborator;

    const response = await fetch(`${API_URL}users/${_id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collaboratorWithoutId),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getCompanies = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}companies`, {
      credentials: "include",
    }); // Incluir token
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createCompany = async (company: NewCompany): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}companies`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(company),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateCompany = async (company: NewCompany): Promise<any> => {
  try {
    const { _id, ...companyWithoutId } = company;

    const response = await fetch(`${API_URL}companies/${_id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(companyWithoutId),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteCompany = async (companyId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}companies/${companyId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getClients = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}clients`, {
      credentials: "include",
    }); // Incluir token
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createClient = async (client: NewClient): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}clients`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateClient = async (company: NewClient): Promise<any> => {
  try {
    const { _id, ...clientWithoutId } = company;

    const response = await fetch(`${API_URL}clients/${_id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientWithoutId),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteClient = async (clientId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}clients/${clientId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTemplates = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}templates`, {
      credentials: "include",
    }); // Incluir token
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createTemplate = async (template: NewTemplate): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}templates`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateTemplate = async (template: NewTemplate): Promise<any> => {
  try {
    const { _id, ...TemplateWithoutId } = template;

    const response = await fetch(`${API_URL}templates/${_id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(TemplateWithoutId),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteTemplate = async (templateId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}templates/${templateId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const downloadTemplate = async (templateId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}templates/download/${templateId}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};
