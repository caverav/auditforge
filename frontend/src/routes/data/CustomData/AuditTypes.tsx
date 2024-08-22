import { useTranslation } from "react-i18next";
import { NewAuditTypeForm } from "./NewAuditType";

export const AuditTypes: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NewAuditTypeForm />
        <div>div 2</div>
      </div>
    </>
  );
};
