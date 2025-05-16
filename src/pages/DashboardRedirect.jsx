import React from 'react';
import useRole from '../hooks/useRole';
import { Navigate } from 'react-router-dom';

const DashboardRedirect = () => {
    const { role } = useRole();

  if (role === "Admin") {
    return <Navigate to="/dashboard/statistics" replace />;
  } else if (role === "Delivery Man") {
    return <Navigate to="/dashboard/my-delivery-list" replace />;
  } else {
    return <Navigate to="/dashboard/my-parcel" replace />;
  }


};


export default DashboardRedirect;