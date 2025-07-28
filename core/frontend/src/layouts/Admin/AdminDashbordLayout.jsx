import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/provider/authProvider';
import {Link} from "react-router-dom";
import logo from '@/assets/images/logo.png'; 
import {HomeIcon, LogOut} from "lucide-react";
import { LOGOUT_ROUTE } from "@/router";
import { axiosUser } from '../../components/api/axios';
import { Button } from '../../components/ui/button';

import { useNavigate } from 'react-router-dom';
import { AdminSideBar } from './AdminSideBar';


const AdminDashbordLayout = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); 
    navigate('/login');
  }

  return (<>
    <header>
      <div
        className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
            <img 
              src={logo} 
              alt="Plenitude Education Logo" 
              width="50" 
            />
            <p>Plénitude Education</p>
          </div>
        <div>
          <ul className="flex text-white">
            <Button onClick={handleLogout}>Se déconnecter</Button>
          </ul>
        </div>
      </div>
    </header>
    <main className={'mx-auto'}>
      <div className="flex">
        <div className={'w-full md:w-2/12 border mr-2 rounded-l bg-card'}>
          <AdminSideBar/>
        </div>
        <div className={'w-full md:w-10/12 border rounded-l bg-card'}>
          <Outlet/>
        </div>
      </div>
    </main>
    
  </>
  );
};

export default AdminDashbordLayout;