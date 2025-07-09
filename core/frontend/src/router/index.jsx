import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Users from '../pages/Users';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Home/>
    }
    ,{
        path:'/login',
        element: <Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/users',
        element: <Users/>
    },
    {
        path:'*',
        element:<NotFound/>
    }
])