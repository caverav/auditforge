import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './AuthProvider';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === null) {
      navigate('/login', { replace: true });
    }
  }, [navigate, isAuth]);

  return children;
}
