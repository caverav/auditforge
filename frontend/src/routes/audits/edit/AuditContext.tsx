import React, { createContext } from 'react';

type AuditContextType = {
  title: string;
  auditType: string;
  locale: string;
};

const defaultContextValue: AuditContextType = {
  title: '',
  auditType: '',
  locale: '',
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
