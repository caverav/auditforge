import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://localhost:8443/api/users/token";
const checktokenUrl = "https://localhost:8443/api/users/checktoken";

export const checktoken = async (): Promise<boolean> => {
  try {
    const response = await fetch(checktokenUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data.status === "success";
  } catch (error) {
    console.log(error);
    return false;
  }
};

const useAuth = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checktoken().then((result) => setIsAuthenticated(result));
  }, []);

  const login = async (username: string, password: string, totp: string) => {
    const data = JSON.stringify({ username, password, totp });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: data,
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
        setIsAuthenticated(true);
        navigate("/audits", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    const path = "/api/users/refreshtoken";
    try {
      const response = await fetch("https://localhost:8443" + path, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.status === "success") {
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isAuthenticated,
    login,
    logout,
    checktoken,
  };
};

export default useAuth;
