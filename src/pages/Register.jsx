import React, { useState } from "react";
import { motion } from "framer-motion";
import TypeWriter from "./../utilities/TypeWriter";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../components/ShareComponents/SocialLogin";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {

    const{updateUser, createUser,}=useAuth()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // password validation
    if (!isValidPassword(formData.password)) {
      return setError(
        "Password should be atleast 6 character one uppercase one lowercase one special character one number"
      );
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");

    // register
 

      try {
        createUser(formData?.email,formData?.password)
        .then(()=>{
            updateUser(formData?.username,formData?.photo)
            .then(()=>{
                toast.success("Successfully Register!")
            })
        })
      } catch (error) {
        
      }

    // Handle registration logic here (e.g., API call)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] via-[#636468] to-[#303132]">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        {/* Left Side Image */}
        <div
          className="hidden md:flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url('https://source.unsplash.com/600x800/?technology,register')`,
          }}
        >
          <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center text-white font-bold text-3xl p-8">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl font-bold text-center text-gray-100"
            >
              <TypeWriter
                text={"Create Your Account on Go Drop!"}
                speed={100}
              />
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
          <h2 className="text-3xl font-bold text-white mb-6">
            Register for a new account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4 relative">
              <input
               required={true}
                type="text"
                name="username"
                placeholder="Username"
                  value={formData.username}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/80"
              />
              <input
               required={true}
                type="url"
                name="photo"
                placeholder="Photo Url"
                  value={formData.photo}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/80"
              />
              <input
               required={true}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/80"
              />
              <input
              required={true}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/80"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute z-50 right-4 top-[65%] transform -translate-y-1/2 text-white cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <input
              
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/80"
              />
              <span
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute z-50  right-4 top-[86%] transform -translate-y-1/2 text-white cursor-pointer"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error && <p className="text-[#FF9F00]">{error}</p>}

            <button className="btn bg-gradient-to-br from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105  text-white w-full ">
              Register
            </button>
          </form>

          <p className="text-white/70 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-white">
              Login here
            </a>
          </p>
          <SocialLogin></SocialLogin>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
