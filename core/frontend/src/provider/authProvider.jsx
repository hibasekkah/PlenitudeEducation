import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosUser } from "../components/api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
      console.log(token)
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = async () => {
    try {
      await axiosUser.post('/api/logout'); 
    } catch (error) {
      console.error("Erreur lors de la déconnexion côté serveur:", error);
    } finally {
      setToken_(null);
      localStorage.removeItem("token");
    }
  };
  
  
const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;