import React, { useEffect } from "react";
import SideNavbar from "./Components/SideNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex overflow-y-hidden h-screen bg-gray-100">
      <SideNavbar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
