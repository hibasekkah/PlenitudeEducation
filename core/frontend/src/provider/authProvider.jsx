import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { axiosUser } from "../components/api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(() => localStorage.getItem("token"));
  const [user, setUser_] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setToken = useCallback((newToken, userData = null) => {
    setToken_(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }

    if (userData) {
      setUser_(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, []);
  
  const setUser = useCallback((newUserData) => {
    setUser_(newUserData);
    if (newUserData) {
      localStorage.setItem('user', JSON.stringify(newUserData));
    } else {
      localStorage.removeItem('user');
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const logout = useCallback(async () => {
    try {
      const resp = await axiosUser.post('/api/logout');
      console.log(resp.data.message);
    } catch (error) {
      console.error("Erreur lors de la déconnexion côté serveur:", error);
    } finally {
      setToken_(null);
      setUser_(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      setToken,
      setUser,
      logout,
    }),
    [token, user, setToken, setUser, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;