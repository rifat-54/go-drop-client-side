import React, { useContext } from 'react';
import { AuthContex } from '../authprovider/AuthProvider';

const useAuth = () => {
   const auth=useContext(AuthContex)
   return auth;
};

export default useAuth;