import { createContext, PropsWithChildren, useContext, useState } from 'react';

const AuthContext = createContext<boolean | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({
  children,
  isSignedIn,
}: AuthProviderProps) {
  // Uses `isSignedIn` prop to determine whether or not to render a user
  const [user] = useState<boolean | null>(isSignedIn ? true : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
