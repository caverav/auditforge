import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checktoken } from '../hooks/useAuth';
import { useAuth } from './AuthProvider';

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const tokenIsValid = await checktoken();
      if (isAuth === false || tokenIsValid === false) {
        navigate('/login', { replace: true });
      } else {
        setLoading(false);
      }
    };

    verifyAuth().catch(console.error);

    const intervalId = setInterval(() => {
      verifyAuth().catch(console.error);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [isAuth, navigate]);

  if (loading) {
    return <div>Loading...</div>; // TODO: Agregar loading page
  }

  return children;
};

export default ProtectedRoute;
