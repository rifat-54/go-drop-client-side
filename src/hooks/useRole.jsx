import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const{user,loading}=useAuth()
    const axiosSecure=useAxiosSecure()

    const{data:role='',isLoading}=useQuery({
        queryKey:['role',user?.email],
        enabled:!loading && !! user?.email,
        queryFn:async()=>{
            const {data}=await axiosSecure(`/user/role/${user?.email}`)
            return data;
        }
    })

    return {role,isLoading};
};

export default useRole;