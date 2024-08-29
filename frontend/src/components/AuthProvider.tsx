import { createContext, PropsWithChildren, useContext, useState } from 'react';

const AuthContext = createContext<boolean | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

const AuthProvider = ({ children, isSignedIn }: AuthProviderProps) => {
  const [user] = useState<boolean | null>(isSignedIn ? true : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
