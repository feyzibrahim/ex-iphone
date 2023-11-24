import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../../components/Modal";
import {
  getOrders,
  getOrderWithQuery,
} from "../../../../redux/actions/admin/ordersAction";
import { BsFilterRight } from "react-icons/bs";
import UpdateOrder from "./UpdateOrder";
import FilterArray from "../../Components/FilterArray";
import ReturnRequestsButtonInOrders from "./ReturnRequestsButtonInOrders";
import ExportModal from "../../Components/ExportModal/ExportModal";
import OrderTableRow from "../../Components/OrderTableRow";

const Orders = () => {
  const dispatch = useDispatch();

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

  // Filtering with status
  const handleClick = (value) => {
    if (value === "all") {
      dispatch(getOrders());
    } else {
      dispatch(getOrderWithQuery(value));
    }
  };

  // Export Modal
  const [showExportModal, setShowExportModal] = useState(false);
  const toggleExportModal = () => {
    setShowExportModal(!showExportModal);
  };

  return (
    <>
      {showExportModal && (
        <Modal tab={<ExportModal toggleExportModal={toggleExportModal} />} />
      )}
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
            <button
              className="admin-button-fl bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-blue-700"
              onClick={toggleExportModal}
            >
              <FiDownload />
              Export
            </button>
            <ReturnRequestsButtonInOrders />
          </div>
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={[
              "all",
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
              "returned",
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
                  <th className="admin-table-head w-64">Product</th>
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
                    <OrderTableRow
                      key={index}
                      index={index}
                      item={item}
                      toggleUpdateModal={toggleUpdateModal}
                      classes={classes}
                    />
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

export default Orders;
