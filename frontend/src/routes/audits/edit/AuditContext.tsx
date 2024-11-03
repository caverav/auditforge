import React, { createContext } from 'react';

type FindingType = {
  id: number;
  name: string;
  category: string;
  severity: string;
  identifier: string;
};

type AuditContextType = {
  title: string;
  auditType: string;
  locale: string;
  handlerFindings: () => Promise<FindingType[]>;
};

const defaultContextValue: AuditContextType = {
  title: '',
  auditType: '',
  locale: '',
  handlerFindings: () => Promise.resolve([]),
};

type AuditContextProps = {
  children: React.ReactNode;
  value: AuditContextType;
};

export const AuditContext =
  createContext<AuditContextType>(defaultContextValue);

export const AuditProvider: React.FC<AuditContextProps> = ({
  children,
  value,
}) => {
  return (
    <AuditContext.Provider value={value}>{children}</AuditContext.Provider>
  );
};
