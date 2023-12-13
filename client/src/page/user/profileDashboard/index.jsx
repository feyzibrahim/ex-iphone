import React from "react";
import { Outlet } from "react-router-dom";
import DashSideNavbar from "../../../components/User/DashSideNavbar";

const ProfileDashboard = () => {
  return (
    <div className="flex gap-5 py-20 lg:px-40 min-h-screen bg-gray-100">
      <DashSideNavbar />
      <Outlet />
    </div>
  );
};

export default ProfileDashboard;
