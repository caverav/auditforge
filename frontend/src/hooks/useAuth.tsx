import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://localhost:8443/api/users";

const useAuth = () => {

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") ? true : false);
  }, []);

  const login = (username: string, password: string, totp: string) => {
    const data = JSON.stringify({ username, password, totp });

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("isAuthenticated", "true");
          setIsAuthenticated(true); 
          navigate("/audits", { replace: true });
        }
      })
      .catch((error) => { 
        console.log(error); 
      });
  }; 

  const logout = () => { 
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false); 
    navigate("/login", { replace: true });
  };

  return { 
    isAuthenticated, 
    login, 
    logout, 
  }; 
};

export default useAuth;
