import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="py-20">
      <h1>Admin</h1>
      <p>{user.email}</p>
      <p>
        {user.firstName} {user.lastName}
      </p>
    </div>
  );
};

export default Dashboard;
