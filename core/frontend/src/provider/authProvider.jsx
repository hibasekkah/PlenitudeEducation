import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosUser } from "../components/api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser_] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const setToken = (newToken,userData) => {
    setToken_(newToken);
    if (userData) {
      setUser_(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
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
      setUser_(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };
  
  
const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
      user,
    }),
    [token,user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;