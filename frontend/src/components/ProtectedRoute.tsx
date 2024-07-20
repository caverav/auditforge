import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './AuthProvider';
import { checktoken } from '../hooks/useAuth';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === null || checktoken() === false) {
      navigate('/login', { replace: true });
    }
  }, []);

  return children;
}
