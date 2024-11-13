import { useContext } from 'react';

import { AuditContext } from './AuditContext';

export const useAuditContext = () => useContext(AuditContext);
