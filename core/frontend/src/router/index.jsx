import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Layout from '../layouts/Layout';


export const LOGIN_ROUTE = '/login'
export const ABOUT_ROUTE = '/about'
export const CONTACT_ROUTE = '/contact'

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {
                path:'/',
                element: <Home/>
            }
            ,{
                path:'/login',
                element: <Login/>
            },
            {
                path:'/contact',
                element:<Contact/>
            },
            {
                path:'/about',
                element: <About/>
            },
            {
                path:'*',
                element:<NotFound/>
            }
                ]
    } 
])