const API_URL = 'https://localhost:4242/api/';

type Details = {
  locale: string;
  title: string;
  vulnType: string;
  description: string;
  observation: string;
  remediation: string;
  cwes: string[];
  references: string[];
  customFields: string[];
} 

type NewVulnerability = {
  cvssv3: string;
  priority: number | "";
  remediationComplexity: number | "";
  details: Details[];
  category: string |null; 
};


export const getLanguages = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}data/languages`, { credentials: "include" }); // Incluir token
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}data/vulnerability-categories`, { credentials: "include" }); // Incluir token
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getTypes = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}data/vulnerability-types`, { credentials: "include" }); // Incluir token
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getVulnerabilities = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}vulnerabilities`, { credentials: "include" }); // Incluir token
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postVulnerability = async (vulnerability: NewVulnerability[]): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}vulnerabilities`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vulnerability),
    });
    if (!response.ok) {
      const errorText = await response.text()
      const errorData = JSON.parse(errorText).datas
      if (errorData === "Vulnerability title already exists"){
        throw new Error(errorData);
      } else {
        throw new Error("Network response was not ok");
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteVulnerability = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}vulnerabilities/${id}`, {
      method: "DELETE",
      credentials: "include",
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
