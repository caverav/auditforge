import { getAudits } from './audits';

export const getAuditsByClientName = async (clientName: string) => {
  // get all audits and filter by clientName
  const audits = await getAudits();
  return audits.datas.filter(audit => audit.company?.name === clientName);
};
