import React, { useEffect } from "react";
import SideNavbar from "./Components/SideNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SmallDeviceNavbar from "./Components/SmallDeviceNavbar";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex lg:flex-row flex-col overflow-y-hidden h-screen bg-gray-100">
      <SmallDeviceNavbar />
      <div className="hidden lg:block px-5 py-3 flex-shrink-0 border-r border-r-gray-300">
        <SideNavbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
