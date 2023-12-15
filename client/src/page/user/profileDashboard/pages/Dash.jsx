import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRocket } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../../Common/api";
import { config } from "../../../../Common/configurations";
import ProfileImage from "../../../../components/ProfileImage";

const Dash = () => {
  const { user } = useSelector((state) => state.user);
  const [orderCounts, setOrderCounts] = useState({});

  const loadOrderCounts = async () => {
    try {
      const { data } = await axios.get(`${URL}/user/order-count`, config);
      if (data) {
        setOrderCounts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderCounts();
  }, []);

  return (
    <div className="min-h-screen px-5 lg:px-0">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-5">
        <div className="bg-blue-100 w-full p-4 flex gap-3 items-center rounded">
          <div className="p-3 bg-white text-blue-400 text-lg">
            <FaRocket />
          </div>
          <div>
            <p className="font-bold text-lg">{orderCounts.totalOrders || 0}</p>
            <p className="text-sm font-semibold text-blue-400">Total Orders</p>
          </div>
        </div>
        <div className="bg-orange-100 w-full p-4 flex gap-3 items-center rounded">
          <div className="p-3 bg-white text-orange-400 text-lg">
            <BiMessageSquareDetail />
          </div>
          <div>
            <p className="font-bold text-lg">
              {orderCounts.pendingOrders || 0}
            </p>
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
            <p className="font-bold text-lg">
              {orderCounts.completedOrders || 0}
            </p>
            <p className="text-sm font-semibold text-green-500">
              Completed Orders
            </p>
          </div>
        </div>
      </div>

      {user && (
        <>
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
            <div className="bg-white w-full border rounded">
              <h1 className="text-lg px-5 py-3 font-semibold border-b">
                Account Info
              </h1>
              <div className="p-5">
                <div className="flex gap-2 items-center pb-3">
                  <div className="h-12 w-12 shrink-0">
                    <ProfileImage user={user} />
                  </div>
                  <p className="font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <p className="font-semibold">
                  Email: <span className="text-gray-500">{user.email}</span>
                </p>
                <p className="font-semibold">
                  Phone No:{" "}
                  <span className="text-gray-500">{user.phoneNumber}</span>
                </p>
                <Link to="profile">
                  <button className="btn-blue-border my-2">Edit Account</button>
                </Link>
              </div>
            </div>
            <div className="w-full"></div>
            {/* <div className="bg-white w-full border rounded">
              <h1 className="text-lg px-5 py-3 font-semibold border-b">
                Address
              </h1>
              <div className="p-5">
                <div className="flex gap-2 items-center pb-3">
                  <div className="w-12 h-12 rounded-full overflow-clip">
                    <img
                      src={`${URL}/img/${user.profileImgURL}`}
                      alt="safdas"
                      className="w-full h-full object-fill"
                    />
                  </div>
                  <p className="font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <p className="font-semibold">
                  Email: <span className="text-gray-500">{user.email}</span>
                </p>
                <p className="font-semibold">
                  Phone No:{" "}
                  <span className="text-gray-500">{user.phoneNumber}</span>
                </p>
                <Link to="profile">
                  <button className="btn-blue-border my-2">Edit Account</button>
                </Link>
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Dash;
