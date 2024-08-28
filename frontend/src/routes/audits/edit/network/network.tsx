import { useParams } from 'react-router-dom';

export const Network = () => {
  return <div className="p-4">auditId: {useParams().auditId}</div>;
};
