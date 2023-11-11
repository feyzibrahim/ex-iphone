import React from "react";
import { useSelector } from "react-redux";
import { FaRocket } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const Dash = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen px-5 lg:px-0">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-5">
        <div className="bg-blue-100 w-full p-4 flex gap-3 items-center rounded">
          <div className="p-3 bg-white text-blue-400 text-lg">
            <FaRocket />
          </div>
          <div>
            <p className="font-bold text-lg">154</p>
            <p className="text-sm font-semibold text-blue-400">Total Orders</p>
          </div>
        </div>
        <div className="bg-orange-100 w-full p-4 flex gap-3 items-center rounded">
          <div className="p-3 bg-white text-orange-400 text-lg">
            <BiMessageSquareDetail />
          </div>
          <div>
            <p className="font-bold text-lg">05</p>
            <p className="text-sm font-semibold text-orange-400">
              Pending Orders
            </p>
          </div>
        </div>
        <div className="bg-green-100 w-full p-4 flex gap-3 items-center rounded">
          <div className="p-3 bg-white text-green-400 text-lg">
            <BiPackage />
          </div>
          <div>
            <p className="font-bold text-lg">149</p>
            <p className="text-sm font-semibold text-green-500">
              Completed Orders
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-lg font-semibold mt-5 mb-2">
        Hello, {user.firstName} {user.lastName}
      </h1>
      <p className="lg:w-3/5  text-gray-500">
        From your account dashboard. you can easily check & view your{" "}
        <Link className="dashboard-link" to="order-history">
          Recent Orders
        </Link>
        , manage your{" "}
        <Link className="dashboard-link" to="addresses">
          Shipping and Billing Addresses
        </Link>{" "}
        and edit your{" "}
        <Link className="dashboard-link" to="settings">
          Password
        </Link>{" "}
        and{" "}
        <Link className="dashboard-link" to="profile">
          Account Details.
        </Link>
      </p>
      <div className="flex flex-col lg:flex-row justify-between gap-5 mt-5">
        <div className="bg-white w-full p-5 border rounded">
          <h1>Account Info</h1>
          <p></p>
        </div>
        <div className="bg-white w-full p-5 border rounded">
          <h1>Address</h1>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Dash;
