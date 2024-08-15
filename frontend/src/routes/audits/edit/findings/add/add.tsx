import { useParams } from "react-router-dom";

export const Add = () => {
  return <div className="p-4">auditId: {useParams().auditId}</div>;
};
