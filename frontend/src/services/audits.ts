const API_URL = "https://localhost:8443/api/";

export interface Audit {
  _id: string;
  name: string;
  type: string;
  language: string;
  company: string;
  participants: string;
  date: string;
  creator: string;
}

interface NewAudit {
  type: string;
  name: string;
  assessment: string;
  languaje: string;
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

// example columns
// const columns = [
//   { header: t("name"), accessor: "name", sortable: true, filterable: true },
//   { header: t("type"), accessor: "type", sortable: true, filterable: true },
//   {
//     header: t("language"),
//     accessor: "language",
//     sortable: true,
//     filterable: true,
//   },
//   {
//     header: t("company"),
//     accessor: "company",
//     sortable: true,
//     filterable: true,
//   },
//   {
//     header: t("participants"),
//     accessor: "participants",
//     sortable: true,
//     filterable: true,
//   },
//   { header: t("date"), accessor: "date", sortable: true, filterable: true },
// ];

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
