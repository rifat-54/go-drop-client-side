import React from "react";
import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const SocialLogin = ({ from = "/" }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  const handleLogin = () => {
    try {
      googleLogin().then(async (res) => {
        toast.success("Successfully login");

        // save to server

        const info = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          photo: res?.user?.photoURL,
          role: "User",
        };

        try {
          const { data } = await axiosPublic.post("/users", info);
       
        } catch (error) {

        }

        navigate(from);

      });


    } catch (error) {

    }
  };

  return (
    <div>
      <div className="divider text-white before:bg-white after:bg-white">
        OR
      </div>
      <button
        onClick={handleLogin}
        className="btn  hover:transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105   w-full "
      >
        <FcGoogle className="text-xl" /> Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
