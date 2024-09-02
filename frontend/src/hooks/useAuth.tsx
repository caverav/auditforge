import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'https://localhost:8443/api/users/token';
const checktokenUrl = 'https://localhost:8443/api/users/checktoken';

export const checktoken = async (): Promise<boolean> => {
  try {
    const response = await fetch(checktokenUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    return data.status === 'success';
  } catch (error) {
    console.error(error);
    return false;
  }
};

const useAuth = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checktoken()
      .then(result => setIsAuthenticated(result))
      .catch(console.error);
  }, []);

  const login = async (username: string, password: string, totp: string) => {
    const data = JSON.stringify({ username, password, totp });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: data,
      });
      const responseData = await response.json();
      if (responseData.status === 'success') {
        setIsAuthenticated(true);
        navigate('/audits', { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    const path = '/api/users/refreshtoken';

    try {
      const response = await fetch('https://localhost:8443' + path, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (data.status === 'success') {
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (
    username: string,
    firstname: string,
    lastname: string,
    password: string,
  ) => {
    const data = JSON.stringify({
      username,
      firstname,
      lastname,
      password,
      role: 'admin',
    });

    try {
      const response = await fetch('/api/users/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: data,
      });
      const responseData = await response.json();
      if (responseData.status === 'success') {
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isAuthenticated,
    login,
    logout,
    checktoken,
    register,
  };
};

export default useAuth;
