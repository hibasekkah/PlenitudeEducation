import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

const LoginRedirect = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default LoginRedirect;