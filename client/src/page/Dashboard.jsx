import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="h-screen w-full p-20">
      <div>
        <h1>{user.email}</h1>
        <p>{user.role}</p>
      </div>
    </div>
  );
};

export default Dashboard;
