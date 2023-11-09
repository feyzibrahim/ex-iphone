import React, { useEffect, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
// import { HiOutlineReceiptRefund } from "react-icons/hi";
// import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { useSelector, useDispatch } from "react-redux";
import date from "date-and-time";
import Modal from "../../../../components/Modal";

import {
  getReturnOrders,
  getReturnOrderWithQuery,
} from "../../../../redux/actions/admin/ordersAction";
import { BsFilterRight } from "react-icons/bs";
import StatusComponent from "../../../../components/StatusComponent";
import FilterArray from "../../Components/FilterArray";
import UpdateReturnOrder from "./UpdateReturnOrder";

const ReturnRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getReturnOrderWithQuery("return request"));
  }, []);

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdateModal = (data) => {
    setUpdateModal(!updateModal);
    setSelectedOrderToUpdate(data);
  };

  const handleClick = (value) => {
    if (value === "all") {
      dispatch(getReturnOrders());
    } else {
      dispatch(getReturnOrderWithQuery(value));
    }
  };

  return (
    <>
      {updateModal && (
        <Modal
          tab={
            <UpdateReturnOrder
              toggleModal={toggleUpdateModal}
              data={selectedOrderToUpdate}
            />
          }
        />
      )}
      <div className="p-5 w-full overflow-y-auto text-sm">
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Return Requests</h1>
            <BreadCrumbs list={["Dashboard", "Orders", "Return Requests"]} />
          </div>
          {/* <div className="flex gap-3">
            <button className="admin-button-fl bg-gray-200 text-blue-700">
              <FiDownload />
              Export
            </button>
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => navigate("return-requests")}
            >
              <HiOutlineReceiptRefund />
              Return Requests
            </button>
          </div> */}
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={[
              "return request",
              "all",
              "return approved",
              "return rejected",
              "pickup completed",
            ]}
            handleClick={handleClick}
          />
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
        {orders && orders.length > 0 ? (
          <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head">No:</th>
                  <th className="admin-table-head">Product</th>
                  <th className="admin-table-head">Order Date</th>
                  <th className="admin-table-head">Customer</th>
                  <th className="admin-table-head">Total</th>
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
                      onClick={() => navigate(`detail/${item._id}`)}
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
                            {item.totalQuantity === 1
                              ? item.totalQuantity + " Product"
                              : "+" + (item.totalQuantity - 1) + " Products"}
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
                      <td className="admin-table-row capitalize">
                        <StatusComponent status={item.status} />
                      </td>
                      <td className="admin-table-row">
                        <div className="flex items-center gap-2 text-lg">
                          <span
                            className="hover:text-gray-500"
                            onClick={(e) => {
                              e.stopPropagation();
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
            <p className="w-44">{error ? error : "No orders are placed yet"}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ReturnRequests;
