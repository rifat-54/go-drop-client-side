import React, { useState } from "react";
import { motion } from "framer-motion";
import TypeWriter from "./../utilities/TypeWriter";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../components/ShareComponents/SocialLogin";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const{loginUser}=useAuth()
    
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const from = location?.state?.from || "/";
    const navigate=useNavigate()
    // console.log('from->',from);

     const handleSubmit=(e)=>{
            e.preventDefault();

            const password=e.target.password.value;
            const email=e.target.email.value;
            

            try {
                loginUser(email,password)
                .then(()=>{
                    toast.success("Successfully Login")
                    navigate(from)
                })
            } catch (error) {
                
            }
     }


  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2  backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        {/* Left Side Image */}
        <div
          className="hidden md:flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/dsbDCf7f/3094352.jpg')`,
          }}
        >
          <div className=" bg-[#646363] bg-opacity-40 w-full h-full flex items-center justify-center  font-bold text-3xl p-8">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl font-bold text-center text-black"
            >
              <TypeWriter
                text={" Welcome to Go Drop!"}
                speed={100}
              ></TypeWriter>
            </motion.h1>
          </div>
        </div>

        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-black mb-6">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
            required={true}
            name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-gray-100 placeholder-gray-800"
            />
            <div className="relative">
            <input
           required={true}
            name="password"
            type={showPassword?'text':'password'}
              placeholder="Password"
              className="input input-bordered w-full  bg-gray-100 placeholder-gray-800"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute z-50 right-4 top-[55%] transform -translate-y-1/2 text-black cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            

            </div>

            <div className="flex justify-between text-sm text-black">
              <label>
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>

            <button className="btn bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white w-full ">
              Login
            </button>
          </form>
          <p className="text-black text-sm mt-6 text-center">
            Don't have an account?{" "}
            <Link to={'/register'} state={from} className="underline hover:text-blue-500">
              Sign up
            </Link>
          </p>
        <SocialLogin from={from}></SocialLogin>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
