import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashSideNavbar from "../../../components/User/DashSideNavbar";

const ProfileDashboard = () => {
  const { user } = useSelector((state) => state.user);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user]);

  return (
    <div className="flex gap-5 py-20 lg:px-40 min-h-screen bg-gray-100">
      <DashSideNavbar />
      <Outlet />
    </div>
  );
};

export default ProfileDashboard;
