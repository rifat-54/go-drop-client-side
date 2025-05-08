import React from 'react';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const SocialLogin = ({from='/'}) => {
    const{googleLogin}=useAuth()
    const navigate=useNavigate()


    const handleLogin=()=>{
        try {
            googleLogin()
            .then(()=>{

                toast.success('Successfully login')
                navigate(from)
            })
        } catch (error) {
            
        }
       
    }


    return (
        <div>
            <div className="divider text-white before:bg-white after:bg-white">OR</div>
            <button onClick={handleLogin} className="btn  hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105   w-full ">
               <FcGoogle className='text-xl'/> Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;