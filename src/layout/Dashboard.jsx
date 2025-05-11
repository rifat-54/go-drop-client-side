import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import './dashboard.css';
import DeliveryMan from "../components/dashboard/DeliveryMan";
import Admin from "../components/dashboard/Admin";
import User from "../components/dashboard/User";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import useRole from './../hooks/useRole';

const Dashboard = () => {
  const{user,logoutUser,updateUser}=useAuth()
  const [open, setOpen] = useState(false);
  const{role}=useRole()

  const handleOpen = () => {
    setOpen(!open);
  };

  console.log(open);

  return (
    <div className="relative">
      <FaBarsStaggered onClick={handleOpen} className="md:hidden absolute top-2 text-xl text-[#161851] left-2" />
      <div className="md:flex gap-2 ">
        <aside className={`sm:w-4/6 md:w-1/4 py-5  text-[#0F172A] bg-[#E0F2FE] md:block  ${open?'block':'hidden'} min-h-screen `}>
          <span className="ml-10 md:text-xl mt-10 flex gap-5 items-center">
          <IoHomeOutline />
            <Link  to={'/'}>Home</Link>
          </span>
            <div  className="flex flex-col justify-end gap-6 items-start">
                <div>

                  {/* {role==='User' &&  <User handleOpen={handleOpen}></User>}
                  {role==='Delivery Man' && <DeliveryMan handleOpen={handleOpen}></DeliveryMan>}
                  {role==='Admin' && <Admin handleOpen={handleOpen}></Admin>} */}


                  <User handleOpen={handleOpen}></User>
                  <DeliveryMan handleOpen={handleOpen}></DeliveryMan>
                  <Admin handleOpen={handleOpen}></Admin>
                    
                </div>
                <div className="divider mt-10"></div>
                <div>
                  <span className="ml-10 md:text-xl  flex gap-5 items-center">
                    <CgProfile />
                    
                    <NavLink to={"/dashboard/profile"}>Profile</NavLink>

                    </span>
                  <span className="ml-10 md:text-xl my-5 flex gap-5 items-center">
                  <CiLogout />
                    <button onClick={logoutUser}>Logout</button>
                  </span>
                    
                    
                </div>
            </div>
           
        </aside>

        <aside className={`md:w-3/4 bg-[#F9FAFB]   md:block ${open?'hidden':'block'} min-h-screen`}>
            <Outlet></Outlet>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
