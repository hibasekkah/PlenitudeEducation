import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ProtectedRoute from './ProtectedRoute';
import LoginRedirect from './LoginRedirect';


import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import About from '../pages/About';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Dashboard from "../pages/Dashbord";
import AdminDashbordLayout from "../layouts/Admin/AdminDashbordLayout";
import AdminProfile from "../layouts/Admin/profile";
import Layout from "../layouts/layout";

export const LOGIN_ROUTE = '/login'
export const ABOUT_ROUTE = '/about'
export const CONTACT_ROUTE = '/contact'
export const LOGOUT_ROUTE = '/logout'

const UserDashboard = () => <div>dashbord</div>;
const UserProfile = () => <div>Profil de l'Utilisateur</div>;
const Logout = () => <div>Page de Déconnexion</div>;


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,       
    errorElement: <NotFound />,  
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        element: <LoginRedirect />,
        children: [
          {
            path: "/",
            element: <Home />, 
          },
          {
            path: "login",
            element: <Login />,
          },
        ]
      },
      
    ],
  },
  
      {
        path: "/admin/",
        element: <AdminDashbordLayout />,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
          {
            path: "profile",
            element: <AdminProfile />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;