import { useTranslation } from "react-i18next";
import AuditSidebar from "../../../components/navbar/AuditSidebar";
import { Outlet } from "react-router-dom";
import { Settings, Globe, List, Plus } from "lucide-react";
import { useState } from "react";

export const AuditRoot = () => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(t("generalInformation"));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<{ id: number; value: string } | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState("Descending");

  const menuItems = [
    { name: t("generalInformation"), icon: Settings, value: "general" },
    { name: t("networkScan"), icon: Globe, value: "network" },
    {
      name: t("findings"),
      icon: List,
      additionalIcon: Plus,
      value: "findings/add",
    },
  ];

  const findings = [
    { id: 1, name: "Finding 1", category: "No Category", severity: "L" },
    { id: 2, name: "Finding 2", category: "No Category", severity: "L" },
    { id: 3, name: "Finding 3", category: "No Category", severity: "L" },
  ];

  const sortOptions = [
    { id: 1, value: "CVSS Score" },
    { id: 2, value: "CVSS Temporal Score" },
    { id: 3, value: "CVSS Environmental Score" },
    { id: 4, value: "Priority" },
    { id: 5, value: "Remediation Difficulty" },
  ];

  const sortOrderOptions = [
    { id: "asc", label: t("ascending"), value: "Ascending" },
    { id: "desc", label: t("descending"), value: "Descending" },
  ];

  const connectedUsers = [
    { id: 1, name: "camilo (me)", online: true },
    { id: 2, name: "massi", online: false },
  ];

  return (
    <>
      <div className="flex overflow-hidden">
        <AuditSidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          menuItems={menuItems}
          connectedUsers={connectedUsers}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptions={sortOptions}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortOrderOptions={sortOrderOptions}
          findings={findings}
        />
        <div className="flex-1 ml-64 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};
