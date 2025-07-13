import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import {Link} from "react-router-dom";
import logo from '@/assets/images/logo.png'; 
import {HomeIcon, LogOut} from "lucide-react";
import { LOGOUT_ROUTE } from "@/router";
const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (<>
    <header>
      <div
        className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
            <img 
              src={logo} 
              alt="Plenitude Education Logo" 
              width="80" 
            />
            <p>Plénitude Education</p>
          </div>
        <div>
          <ul className="flex text-white">
            <li className="ml-5 px-2 py-1">
              <Link className={'flex'} to={'/'}><HomeIcon className={'mx-1'}/> Profil</Link>
            </li>
            <li className="ml-5 px-2 py-1">
              <Link className={'flex'} to={LOGOUT_ROUTE}><LogOut className={'mx-1'}/> Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main className={'container'}>
      <Outlet/>
    </main>
  </>
  );
};

export default ProtectedRoute;