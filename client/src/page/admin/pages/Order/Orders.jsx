import React, { useEffect, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { useSelector, useDispatch } from "react-redux";
import date from "date-and-time";
import Modal from "../../../../components/Modal";

import { getOrders } from "../../../../redux/actions/admin/ordersAction";
import { BsFilterRight } from "react-icons/bs";
import UpdateOrder from "./UpdateOrder";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdateModal = (data) => {
    setUpdateModal(!updateModal);
    setSelectedOrderToUpdate(data);
  };

  return (
    <>
      {updateModal && (
        <Modal
          tab={
            <UpdateOrder
              toggleModal={toggleUpdateModal}
              data={selectedOrderToUpdate}
            />
          }
        />
      )}
      <div className="p-5 w-full overflow-y-auto text-sm">
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Orders</h1>
            <BreadCrumbs list={["Dashboard", "Orders"]} />
          </div>
          <div className="flex gap-3">
            <button className="admin-button-fl bg-gray-200 text-blue-700">
              <FiDownload />
              Export
            </button>
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => navigate("create")}
            >
              <AiOutlinePlus />
              Create Order
            </button>
          </div>
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <div className="flex justify-between gap-2 font-semibold bg-white text-gray-500 my-2 p-1 shadow rounded-md">
            <p className="bg-gray-100 rounded px-2 py-1 text-blue-600 cursor-pointer">
              All Status
            </p>
            <p className="admin-status">Pending</p>
            <p className="admin-status">Processing</p>
            <p className="admin-status">Shipped</p>
            <p className="admin-status">Delivered</p>
            <p className="admin-status">Cancelled</p>
            <p className="admin-status">Returned</p>
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
        {orders.length > 0 ? (
          <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
            <table className="w-full min-w-max table-auto ">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head">No:</th>
                  <th className="admin-table-head">Product</th>
                  <th className="admin-table-head">Order Date</th>
                  <th className="admin-table-head">Customer</th>
                  <th className="admin-table-head">Total</th>
                  <th className="admin-table-head">Delivery Date</th>
                  <th className="admin-table-head">Status</th>
                  <th className="admin-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => {
                  const isLast = index === orders.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-200 ";
                  return (
                    <tr
                      key={index}
                      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
                    >
                      <td className="admin-table-row">{index + 1}</td>
                      <td className="admin-table-row flex items-center gap-2">
                        <div className="w-10 h-10 overflow-clip flex justify-center items-center">
                          {item.products[0].productId.imageURL ? (
                            <img
                              src={`http://localhost:4000/img/${item.products[0].productId.imageURL}`}
                              alt="img"
                              className="object-contain w-full h-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
                          )}
                        </div>
                        <div>
                          <p className="line-clamp-1 mb-1 font-semibold">
                            {item.products[0].productId.name}
                          </p>
                          <p className="font-semibold text-gray-500">
                            +{item.totalQuantity - 1} Products
                          </p>
                        </div>
                      </td>
                      <td className="admin-table-row">
                        {date.format(new Date(item.createdAt), "MMM DD YYYY")}
                      </td>
                      <td className="admin-table-row">
                        {item.user.firstName} {item.user.lastName}
                      </td>
                      <td className="admin-table-row">{item.totalPrice}₹</td>
                      <td className="admin-table-row">
                        {date.format(
                          new Date(item.deliveryDate),
                          "MMM DD YYYY"
                        )}
                      </td>
                      <td className="admin-table-row capitalize">
                        {item.status}
                      </td>
                      <td className="admin-table-row">
                        <div className="flex items-center gap-2 text-lg">
                          <span
                            className="hover:text-gray-500"
                            onClick={() => {
                              toggleUpdateModal({
                                id: item._id,
                                status: item.status,
                              });
                            }}
                          >
                            <AiOutlineEdit />
                          </span>
                          <span
                            className="hover:text-gray-500"
                            onClick={() => {}}
                          >
                            <AiOutlineDelete />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/3 lg:left-1/2 lg:right-1/2">
            <p className="w-44">No orders are placed yet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
