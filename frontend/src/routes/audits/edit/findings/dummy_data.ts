import { Column } from "../../../../components/table/UITable";

export interface TmpVulnFindings {
    _id: string;
    title: string;
    category: string;
    type: string;
    language: string;
  }

const exampleFinding1: TmpVulnFindings = {
  _id: "12345",
  title: "SQL Injection Vulnerability",
  category: "Security",
  type: "Critical",
  language: "en",
};

const finding1: TmpVulnFindings = {
  _id: "67890",
  title: "Cross-Site Scripting (XSS) Vulnerability",
  category: "Security",
  type: "High",
  language: "en",
};

const finding2: TmpVulnFindings = {
  _id: "24680",
  title: "Unsecured API Endpoint",
  category: "API",
  type: "Medium",
  language: "en",
};

const finding3: TmpVulnFindings = {
  _id: "13579",
  title: "Outdated Software Version",
  category: "Maintenance",
  type: "Low",
  language: "en",
};

const exampleFinding4: TmpVulnFindings = {
  _id: "12345",
  title: "Vulnerabilidad de inyección SQL",
  category: "Security",
  type: "Critical",
  language: "es",
};

const finding5: TmpVulnFindings = {
  _id: "67890",
  title: "Vulnerabilidad XSS",
  category: "Security",
  type: "High",
  language: "es",
};

const finding6: TmpVulnFindings = {
  _id: "24680",
  title: "Endpoint de API no seguro",
  category: "API",
  type: "Medium",
  language: "es",
};

const finding7: TmpVulnFindings = {
  _id: "13579",
  title: "Versión de software obsoleto",
  category: "Maintenance",
  type: "Low",
  language: "es",
};

export const exampleFindings = [exampleFinding1, finding1, finding2, finding3,
  exampleFinding4, finding5, finding6, finding7
]

const column1: Column = {
  header: "ID",
  accessor: "_id",
  sortable: true,
  filterable: true,
};

const column2: Column = {
  header: "Title",
  accessor: "title",
  sortable: true,
  filterable: true,
};

const column3: Column = {
  header: "Category",
  accessor: "category",
  sortable: false,
  filterable: true,
};

const column4: Column = {
  header: "Type",
  accessor: "type",
  sortable: false,
  filterable: true,
};

export const getVulnColumns = () => [column1, column2, column3, column4]

