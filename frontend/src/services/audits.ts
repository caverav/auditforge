const API_URL = "https://localhost:8443/api/";

export interface Finding {
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
}

export interface Detail {
  customFields: string[];
  cwes: string[];
  locale: string;
  title: string;
  references: string[];
}

export interface FindingByLocale {
  cvssv3: string;
  _id: string;
  detail: Detail;
}

export interface Audit {
  _id: string;
  name: string;
  auditType: string;
  language: string;
  company: string;
  collaborators: string[];
  createdAt: string;
  creator: string;
  state: string;
  type: string;
  connected: string[];
  sections?: string[];
  customFields?: string[];
  sortFindings?: string[];
  approvals?: string[];
  scope?: string[];
  findings: Finding[];
  template?: string;
  client?: string;
  updatedAt: string;
  __v: number;
}

interface NewAudit {
  auditType: string;
  name: string;
  language: string;
  type: string;
}

export const createAudit = async (audit: NewAudit): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}audits`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(audit),
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

export const getTypes = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}data/audit-types`, {
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

export const getLanguages = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}data/languages`, {
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

export const getCompanies = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}companies`, {
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

export const getAudits = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}audits`, {
      headers: { "Content-Type": "application/json" },
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

export const getAuditById = async (
  auditId: string | undefined,
): Promise<{ datas: Audit }> => {
  try {
    const response = await fetch(`${API_URL}audits/${auditId}`, {
      headers: { "Content-Type": "application/json" },
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

export const getAuditColumns = async (): Promise<any> => {
  console.log("Loading audit columns");
  try {
    const response = await fetch(`${API_URL}audits`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const keys = Object.keys(data.datas[0]);
    const columns = keys.map((key: string) => ({
      header: key,
      accessor: key,
      sortable: true,
      filterable: true,
    }));
    return columns;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchUsername = () => {
  // /api/users/me
  const user = fetch(`${API_URL}users/me`, {
    credentials: "include",
  }).then((res) => res.json());
  return user;
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

export const getVulnByLanguage = async (locale: string): Promise<any> =>  {
  try {
    const response = await fetch(`${API_URL}vulnerabilities/${locale}`, {
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
}
