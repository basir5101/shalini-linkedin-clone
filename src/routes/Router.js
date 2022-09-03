import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full-layout/loadable/Loadable';
import { ProtectedRoute } from './ProtectedRoute';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full-layout/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank-layout/BlankLayout')));
/* ***End Layouts**** */

const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../views/authentication/ResetPassword')));

/* ****Pages***** */
const Dashboard1 = Loadable(lazy(() => import('../views/dashboards/Dashboard1')));


/* ****Tables***** */


/* ****Forms***** */
const AddUser = Loadable(lazy(() => import('../views/apps/users/addUser')));



/* ****Routes***** */

const Router = [
    {
        path: '/',
        element: <ProtectedRoute><FullLayout /></ProtectedRoute>,
        children: [
            { path: '/', element: <Navigate to="/dashboards/dashboard1" /> },
            { path: '/my-profile', element: <AddUser /> },
            { path: '/dashboards/dashboard1', exact: true, element: <Dashboard1 /> },
            { path: '*', element: <Navigate to="/404" /> },
        ],
    },
    {
        path: '/',
        element: <BlankLayout />,
        children: [
            { path: '404', element: <Error /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'reset-password', element: <ResetPassword /> },
            { path: '*', element: <Navigate to="/404" /> },
        ],
    },
];

export default Router;
