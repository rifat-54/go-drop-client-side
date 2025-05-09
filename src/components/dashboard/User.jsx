import React from "react";
import { NavLink } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";

const User = ({ handleOpen }) => {
  return (
    <div>
      <ul className="ml-10 mt-10 space-y-5 md:text-xl">
        <li className="flex gap-4 items-center">
          <span>
            <CiBookmark />
          </span>
          <NavLink to={"/dashboard/book-parcel"}> Book a Parcel</NavLink>
        </li>
        <li className="flex gap-4 items-center">
          <span>
            <TbTruckDelivery />
          </span>
          <NavLink to={"/dashboard/my-parcel"}>My Parcel</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default User;
