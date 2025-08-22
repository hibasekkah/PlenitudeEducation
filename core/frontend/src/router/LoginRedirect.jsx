import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

const LoginRedirect = () => {
  const { token } = useAuth();
  const { user } = useAuth();
 
  if (token) {
    switch(user.role){
      case 'admin':return <Navigate to="/admin/dashboard" replace />;break;
      case 'formateur':return <Navigate to="/formateur/seances" replace />;break;
      case 'rh':return <Navigate to="/rh/entreprise" replace />;break;
      case 'participant':return <Navigate to="/participant/seance" replace />;break;
    }
    
  }

  return <Outlet />;
};

export default LoginRedirect;