// component to wrap the routes that require authentication

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthWrapper = ({ children }: { children: any }) => {

  const { user, isAuthenticated, login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {children}
    </>
  );
};
