import { useParams } from "react-router-dom";
export const General = () => {
  return <div className="p-4">auditId: {useParams().auditId}</div>;
};
