import React, { useEffect } from "react";
import { BsCaretRightFill, BsFilterRight } from "react-icons/bs";
import {
  AiOutlinePlus,
  AiOutlineCalendar,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers } from "../../../../redux/actions/admin/customerAction";
import date from "date-and-time";

const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customers, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  return (
    <div className="p-5 w-full overflow-y-auto">
      <div className="flex justify-between items-center text-xs font-semibold">
        <div>
          <h1 className="font-bold text-2xl">Customers</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-blue-500 font-semibold">Dashboard</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Customer List</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="admin-button-fl bg-gray-200 text-blue-700">
            <FiDownload />
            Export
          </button>
          <button
            className="admin-button-fl bg-blue-700 text-white"
            onClick={() => navigate("addCustomer")}
          >
            <AiOutlinePlus />
            Create New Customer
          </button>
        </div>
      </div>
      <div className="lg:flex justify-between items-center text-xs font-semibold">
        <div className="flex justify-between gap-2 font-semibold bg-white text-gray-500 my-2 p-1 shadow rounded-md">
          <p className="bg-gray-100 rounded px-2 py-1 text-blue-600 cursor-pointer">
            All
          </p>
          <p className="admin-status">Active</p>
          <p className="admin-status">Blocked</p>
        </div>
        <div className="flex my-2 gap-3">
          <button className="admin-button-fl bg-white">
            <AiOutlineCalendar />
            Select Date
          </button>
          <button className="admin-button-fl bg-white">
            <BsFilterRight />
            Filters
          </button>
        </div>
      </div>
      <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
        {customers && (
          <table className="w-full min-w-max table-auto ">
            <thead className="font-normal">
              <tr className="border-b border-gray-200">
                <th className="admin-table-head">Name</th>
                <th className="admin-table-head">Email</th>
                <th className="admin-table-head">Phone No</th>
                <th className="admin-table-head">DOB</th>
                <th className="admin-table-head">Status</th>
                <th className="admin-table-head">Joined</th>
                <th className="admin-table-head">Wallet Balance</th>
                <th className="admin-table-head">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                const isLast = index === customers.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-gray-200 ";

                return (
                  <tr
                    key={index}
                    className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
                  >
                    <td className="admin-table-row flex items-center gap-2">
                      <div className="w-10 h-10 overflow-clip flex justify-center items-center">
                        {customer.profileImgURL ? (
                          <img
                            src={`http://localhost:4000/img/${customer.imageURL}`}
                            alt="img"
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
                        )}
                      </div>
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td className="admin-table-row">{customer.email}</td>
                    <td className="admin-table-row">{customer.phoneNumber}</td>
                    <td className="admin-table-row">{customer.dateOfBirth}</td>
                    <td className="admin-table-row">{customer.status}</td>
                    <td className="admin-table-row">
                      {customer.createdAt
                        ? date.format(
                            new Date(customer.createdAt),
                            "MMM DD YYYY"
                          )
                        : "No Data"}
                    </td>
                    <td className="admin-table-row capitalize">
                      {customer.walletBalance}
                    </td>
                    <td className="admin-table-row">
                      <div className="flex items-center gap-2 text-lg">
                        <span className="hover:text-gray-500">
                          <AiOutlineEdit />
                        </span>
                        <span className="hover:text-gray-500">
                          <AiOutlineDelete />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customers;
