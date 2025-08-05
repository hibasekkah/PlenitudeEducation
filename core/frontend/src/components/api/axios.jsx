import axios from 'axios';

const axiosUser = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  withCredentials: true,
});


axiosUser.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosUser.interceptors.response.use(
  (response) => {
    return response;
  },

  
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      
      
      console.log("Token expiré ou invalide. Déconnexion automatique.");
      
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      
      delete axios.defaults.headers.common["Authorization"];
  
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export { axiosUser };



