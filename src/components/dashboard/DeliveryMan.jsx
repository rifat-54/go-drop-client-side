import React from 'react';
import { CiViewList } from "react-icons/ci";
import { FcRating } from "react-icons/fc";
import { NavLink } from 'react-router-dom';
const DeliveryMan = ({handleOpen}) => {
    return (
        <div>
          <ul className="ml-10 mt-10 space-y-5 md:text-xl">
            <li className="flex gap-4 items-center">
              <span>
              <CiViewList />
              </span>
              <NavLink to={"/dashboard/my-delivery-list"}> My Delivery List</NavLink>
            </li>
            <li className="flex gap-4 items-center">
              <span>
              <FcRating />
              </span>
              <NavLink to={"/dashboard/my-revews"}>My Reviews</NavLink>
            </li>
          </ul>
        </div>
      );
};

export default DeliveryMan;