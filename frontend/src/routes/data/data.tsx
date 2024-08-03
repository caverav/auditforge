import { useTranslation } from "react-i18next";
import { Sidebar } from "../../components/navbar/Sidebar";
import { Outlet } from "react-router-dom";

export const Data = () => {
  const { t } = useTranslation();
  const sidebarList = [
    { name: t("collaborators"), value: "collaborators" },
    { name: t("companies"), value: "companies" },
    { name: t("clients"), value: "clients" },
    { name: t("templates"), value: "templates" },
    { name: t("customData"), value: "customData" },
    { name: `${t("import")} / ${t("export")}`, value: "importExport" },
  ];
  return (
    <>
      <div className="flex">
        <Sidebar
          title={t("handleCustomData")}
          items={sidebarList}
          defaultItem={sidebarList[0]}
        />
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};
