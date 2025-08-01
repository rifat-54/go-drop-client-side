import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../assets/android-chrome-192x192.png";
import { MdDarkMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../hooks/useAxiosSecure';
import useRole from './../hooks/useRole';

const Navber = () => {
  const { user, logoutUser,loading } = useAuth();
  const [theme, setTheme] = useState("light");
  const axiosSecure=useAxiosSecure()
  const{role}=useRole()


  const handleLogout = () => {
    try {
      logoutUser().then(() => {
        toast.success("Successfully Logout");
      });
    } catch (error) {}
  };

  // get card data

  const {data:cart={}}=useQuery({
    queryKey:['cart',user?.email],
    enabled: !loading && !!user?.email,
    queryFn:async()=>{
      const {data}=await axiosSecure(`/mycart/${user?.email}`);
      return data;
    }
  })



  // dark and light theme
  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="bg-[#1874c1]">
      <div className="navbar px-1 max-w-7xl mx-auto flex justify-between  text-[#fffe] shadow-sm">
        <div className="flex items-center md:ml-1 gap-5">
          <img
            referrerPolicy="no-referrer"
            className="h-10"
            src={logoImg}
            alt=""
          />
          <Link to={"/"} className=" text-xl">
            Go Drop
          </Link>
        </div>
        <div>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          {user?.email ? (
            <div className="flex items-center gap-2 md:gap-3">
              {
                role==='User' && <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />{" "}
                    </svg>
                    <span className="badge bg-red-500 text-white badge-sm indicator-item">
                      {cart?.totalBooked}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg text-black font-bold">{cart?.totalBooked} Items</span>
                    <span className="text-info">Subtotal: ${cart?.totalCost}</span>
                    <div className="card-actions">
                      <Link to={'/dashboard/my-parcel'} className="btn btn-primary btn-block">
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              }
              
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-[#202e39d6] text-[#fffe] rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      {role}
                      <span className="badge">{user?.displayName}</span>
                    </a>
                  </li>
                  <li>
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link className="mr-1 md:mr-2" to={"/login"}>
              Login
            </Link>
          )}

          {/* dark mode */}

          {/* <div className="flex items-center -mr-1 ml-2">
            <button onClick={handleTheme} className="text-xl md:text-2xl">
              {theme === "light" ? (
                <MdDarkMode />
              ) : (
                <CiDark className="text-white" />
              )}
            </button>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Navber;
