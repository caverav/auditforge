const API_URL = "https://localhost:4242/api/";

interface NewCollaborator {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  role: string;
  totpenabled: boolean;
  username: string;
}

interface NewCompany {
  name: string;
  shortname: string;
  logo: string;
}

interface NewClient {
  company: string;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  phone: string;
  cell: string;
}

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

export const createCompany = async (
  company: NewCompany
): Promise<any> => {
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

export const createClient = async (
  client: NewClient
): Promise<any> => {
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