import { getAudits } from './audits';
const API_URL = `${import.meta.env.VITE_API_URL}/api/`;

export const getAuditsByClientName = async (clientName: string) => {
  // get all audits and filter by clientName
  const audits = await getAudits();
  return audits.datas.filter(audit => audit.company?.name === clientName);
};
