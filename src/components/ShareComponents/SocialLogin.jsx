import React from 'react';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const SocialLogin = () => {
    const{googleLogin}=useAuth()
    const navigate=useNavigate()


    const handleLogin=()=>{
        try {
            googleLogin()
            .then(()=>{

                toast.success('Successfully login')
                navigate('/')
            })
        } catch (error) {
            
        }
       
    }


    return (
        <div>
            <div className="divider text-white before:bg-white after:bg-white">OR</div>
            <button onClick={handleLogin} className="btn bg-gradient-to-br from-[#6366f1] via-[#10b981] to-[#059669] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white w-full ">
               <FcGoogle className='text-xl'/> Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;