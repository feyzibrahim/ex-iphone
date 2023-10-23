import React from "react";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="bg-white p-5 rounded-md">
        <p>{user.email}</p>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
