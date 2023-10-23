import React from "react";
import SideNavbar from "./Components/SideNavbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex overflow-y-hidden h-screen bg-gray-100">
      <SideNavbar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
