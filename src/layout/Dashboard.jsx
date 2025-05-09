import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import './dashboard.css';
import DeliveryMan from "../components/dashboard/DeliveryMan";
import Admin from "../components/dashboard/Admin";
import User from "../components/dashboard/User";
const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  console.log(open);

  return (
    <div className="relative">
      <FaBarsStaggered onClick={handleOpen} className="md:hidden absolute top-2 text-xl text-[#161851] left-2" />
      <div className="md:flex gap-2 ">
        <aside className={`sm:w-4/6 md:w-1/4 py-5  text-[#0F172A] bg-[#E0F2FE] md:block  ${open?'block':'hidden'} h-screen `}>
            <Link className="ml-10 mt-10" to={'/'}>Home</Link>
            <div  className="flex flex-col justify-end gap-64 items-start">
                <div>
                    <User handleOpen={handleOpen}></User>
                    <DeliveryMan handleOpen={handleOpen}></DeliveryMan>
                    {/* <Admin handleOpen={handleOpen}></Admin> */}
                </div>
                <div>
                    <h2>Profile</h2>
                    <h2>Logout</h2>
                    
                </div>
            </div>
           
        </aside>

        <aside className={`md:w-3/4 bg-[#F9FAFB]   md:block ${open?'hidden':'block'} h-screen`}>
            <Outlet></Outlet>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
