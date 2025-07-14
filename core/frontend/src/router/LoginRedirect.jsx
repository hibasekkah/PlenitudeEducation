import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

const LoginRedirect = () => {
  const { token } = useAuth();
  const { user } = useAuth();
 
  if (token) {
    switch(user.role){
      case 'admin':return <Navigate to="/admin/dashboard" replace />;break;
      case 'formateur':return <Navigate to="/formateur/dashboard" replace />;break;
      case 'rh':return <Navigate to="/rh/dashboard" replace />;break;
      case 'participant':return <Navigate to="/participant/dashboard" replace />;break;
    }
    
  }

  return <Outlet />;
};

export default LoginRedirect;