import { useParams } from "react-router-dom";

export const Edit = () => {
  return (
    <div className="p-4">
      auditId: {useParams().auditId} findingId: {useParams().findingId}
    </div>
  );
};
