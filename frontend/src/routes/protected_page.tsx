import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
  }

export const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};