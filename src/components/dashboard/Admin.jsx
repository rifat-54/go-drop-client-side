import React from 'react';
import { FaUsers } from "react-icons/fa";
import { FcStatistics } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import { FaUsersCog } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";


const Admin = ({handleOpen}) => {
    return (
        <div>
          <ul className="ml-10 mt-10 space-y-5 md:text-xl">
            <li className="flex gap-4 items-center">
              <span>
              <FcStatistics />
              </span>
              <NavLink to={"/dashboard/statistics"}> Statistics</NavLink>
            </li>
            <li className="flex gap-4 items-center">
              <span>
              <FaUsers />
              </span>
              <NavLink to={"/dashboard/all-users"}>All Users</NavLink>
            </li>
            <li className="flex gap-4 items-center">
              <span>
              <FiTruck />
              </span>
              <NavLink to={"/dashboard/all-parcels"}>All Parcels</NavLink>
            </li>
            <li className="flex gap-4 items-center">
              <span>
              <FaUsersCog />
              </span>
              <NavLink to={"/dashboard/all-delivery-men"}> All Delivery Men</NavLink>
            </li>
          </ul>
        </div>
      );
};

export default Admin;