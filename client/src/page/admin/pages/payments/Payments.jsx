import React, { useEffect, useState } from "react";
import {
  AiOutlineCalendar,
  // AiOutlineDelete,
  // AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { useSelector, useDispatch } from "react-redux";
import date from "date-and-time";
// import Modal from "../../../../components/Modal";

import { getPayments } from "../../../../redux/actions/admin/paymentAction";
import { BsFilterRight } from "react-icons/bs";
// import UpdateOrder from "./UpdateOrder";
import StatusComponent from "../../../../components/StatusComponent";
import FilterArray from "../../Components/FilterArray";

const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { payments, loading, error } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(getPayments());
  }, []);

  // const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  // const [updateModal, setUpdateModal] = useState(false);
  // const toggleUpdateModal = (data) => {
  // setUpdateModal(!updateModal);
  // setSelectedOrderToUpdate(data);
  // };

  const handleClick = (value) => {
    // if (value === "all") {
    dispatch(getPayments());
    // } else {
    //   dispatch(getOrderWithQuery(value));
    // }
  };

  return (
    <>
      {/* {updateModal && (
        <Modal
          tab={
            <UpdateOrder
              toggleModal={toggleUpdateModal}
              data={selectedOrderToUpdate}
            />
          }
        />
      )} */}
      <div className="p-5 w-full overflow-y-auto text-sm">
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Payments</h1>
            <BreadCrumbs list={["Dashboard", "Payments"]} />
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
          <FilterArray
            list={["all", "success", "pending", "cancelled", "refunded"]}
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
        {payments && payments.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head">No:</th>
                  <th className="admin-table-head">User name</th>
                  <th className="admin-table-head">Total Price</th>
                  <th className="admin-table-head">Date</th>
                  <th className="admin-table-head">Payment Mode</th>
                  <th className="admin-table-head w-60">Payment Id</th>
                  <th className="admin-table-head">Order Id</th>
                  <th className="admin-table-head">Status</th>
                  {/* <th className="admin-table-head">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {payments.map((item, index) => {
                  const isLast = index === payments.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-200 ";
                  return (
                    <tr
                      key={index}
                      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
                      // onClick={() => navigate(`detail/${item._id}`)}
                    >
                      <td className="admin-table-row">{index + 1}</td>
                      <td className="admin-table-row flex items-center gap-2">
                        <p className="line-clamp-1 mb-1 font-semibold">
                          {item.user.firstName} {item.user.lastName}
                        </p>
                      </td>
                      <td className="admin-table-row">
                        {item.order.totalPrice}₹
                      </td>
                      <td className="admin-table-row">
                        {date.format(new Date(item.createdAt), "MMM DD YYYY")}
                      </td>
                      <td className="admin-table-row">{item.paymentMode}</td>
                      <td className="admin-table-row">
                        <p className="line-clamp-1">{item.payment_id}</p>
                      </td>
                      <td className="admin-table-row">{item.order._id}</td>
                      <td className="admin-table-row capitalize">
                        <StatusComponent status={item.status || ""} />
                      </td>
                      {/* <td className="admin-table-row">
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
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/3 lg:left-1/2 lg:right-1/2">
            <p className="w-44">{error ? error : "No payments yet"}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Payments;