import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/ShareComponents/LoadingSpinner';

const PrivateRoutes = ({children}) => {
    const{user,loading}=useAuth()
    const location=useLocation();

    // console.log('private-> ',loading);


    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }


    if(user) return children;

   return <Navigate to={'/login'} state={{from:location?.pathname}} ></Navigate>
};

export default PrivateRoutes;