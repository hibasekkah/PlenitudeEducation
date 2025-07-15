import {Link, Outlet} from "react-router-dom";
import logo from '../assets/images/logo.png'; 
import {LOGIN_ROUTE,CONTACT_ROUTE,ABOUT_ROUTE} from "../router/index";
import {HomeIcon, LogInIcon, MailIcon,UsersIcon} from "lucide-react";

export default function Layout() {
 
  return <>
    <header>
      <div
        className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mx-auto shadow-2xl">
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
            <li className="ml-5 px-2 py-1">
              <Link className={'flex'} to={'/'}><HomeIcon className={'mx-1'}/> Accueil</Link>
            </li>
            <li className="ml-5 px-2 py-1">
              <Link className={'flex'} to={ABOUT_ROUTE}><UsersIcon className={'mx-1'}/> Qui somme nous?</Link>
            </li>
            <li className="ml-5 px-2 py-1">
              <Link className={'flex'} to={CONTACT_ROUTE}><MailIcon className={'mx-1'}/> Contact</Link>
            </li>
            <li className="ml-5 px-2 py-1">
              <Link className={'flex'} to={LOGIN_ROUTE}><LogInIcon className={'mx-1'}/> se connecter</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main className={'container flex flex-col items-center'}>
      <Outlet/>
    </main>
    <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Plénitude Education. All rights reserved.
          </p>
        </div>
      </footer>
  </>
}