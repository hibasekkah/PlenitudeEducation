import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoginRedirect from './LoginRedirect';

import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import About from '../pages/About';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import AdminDashbordLayout from "../layouts/Admin/AdminDashbordLayout";
import FormateurDashbordLayout from "../layouts/Formateur/FormateurDashbordLayout";
import RhDashbordLayout from "../layouts/RH/RhDashbordLayout";
import ParticipantDashbordLayout from "../layouts/Participant/ParticipantDashbordLayout";
import AdminProfile from "../layouts/Admin/profile";
import RhProfile from "../layouts/RH/Rhprofile";
import ParticipantProfile from "../layouts/Participant/Participantprofile";
import FormateurProfile from "../layouts/Formateur/Formateurprofile";
import Layout from "../layouts/layout";
import { ManageEntreprise } from "../layouts/Admin/ManageEntreprise";

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
          {
            path: "entreprise",
            element: <ManageEntreprise />,
          },
        ],
      },
      {
        path: "/participant/",
        element: <ParticipantDashbordLayout />,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
          {
            path: "profile",
            element: <ParticipantProfile />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
      {
        path: "/formateur/",
        element: <FormateurDashbordLayout />,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
          {
            path: "profile",
            element: <FormateurProfile />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
      {
        path: "/rh/",
        element: <RhDashbordLayout />,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
          {
            path: "profile",
            element: <RhProfile />,
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