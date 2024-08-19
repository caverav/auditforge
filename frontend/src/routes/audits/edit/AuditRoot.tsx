import { useTranslation } from "react-i18next";
import { Sidebar } from "../../../components/navbar/Sidebar";
import { Outlet } from "react-router-dom";

export const AuditRoot = () => {
  const { t } = useTranslation();
  const sidebarList = [
    { name: t("generalInformation"), value: "general", id: 1 },
    { name: t("networkScan"), value: "network", id: 2 },
    { name: t("findings"), value: "findings/add", id: 3 },
  ];
  return (
    <>
      <div className="flex overflow-hidden">
        <Sidebar title={""} items={sidebarList} defaultItem={sidebarList[0]} />
        <div className="flex-1 ml-64 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};
