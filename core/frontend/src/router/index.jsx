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
import AdminProfile from "../components/Admin/pages/profile";
import RhProfile from "../layouts/RH/Rhprofile";
import ParticipantProfile from "../layouts/Participant/Participantprofile";
import FormateurProfile from "../layouts/Formateur/Formateurprofile";
import Layout from "../layouts/layout";
import { ManageEntreprise } from "../components/Admin/pages/ManageEntreprise";
import { ManageFormation } from "../components/Admin/pages/ManageFormation";
import { ManageModule } from "../components/Admin/pages/ManageModule";
import { ManageAtelier } from "../components/Admin/pages/ManageAtelier";
import { ManageSeance } from "../components/Admin/pages/ManageSeance";
import { ManageSession } from "../components/Admin/pages/ManageSession";
import { ManageParticipant } from "../components/Admin/pages/ManageParticipant";
import ForgotPassword from "../components/Login/ForgotPassword";
import ResetPassword from "../components/Login/ResetPassword";
import { ManageRH } from "../components/Admin/pages/ManageRH";
import { ManageFormateur } from "../components/Admin/pages/ManageFormateur";
import { ParticipantInvitationRegister } from "../components/Participant/ParticipantInvitationRegister";
import { AdminDashbord } from "../components/Admin/pages/AdminDashbord";

export const LOGIN_ROUTE = '/login'
export const ABOUT_ROUTE = '/about'
export const CONTACT_ROUTE = '/contact'
export const LOGOUT_ROUTE = '/logout'

const UserDashboard = () => <div>dashbord</div>;
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
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "password-reset/:token",
        element: <ResetPassword />,
      },
      {
        path: "register/invite/:token",
        element: <ParticipantInvitationRegister />,
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
            element: <AdminDashbord />,
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
          {
            path: "participant",
            element: <ManageParticipant />,
          },
          {
            path: "formation",
            element: <ManageFormation />,
          },
          {
            path: "module",
            element: <ManageModule />,
          },
          {
            path: "atelier",
            element: <ManageAtelier />,
          },
          {
            path: "Session",
            element: <ManageSession />,
          },
          {
            path: "seance",
            element: <ManageSeance />,
          },
          {
            path: "rh",
            element: <ManageRH />,
          },
          {
            path: "formateur",
            element: <ManageFormateur />,
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