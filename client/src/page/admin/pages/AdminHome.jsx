import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderTableRow from "../Components/OrderTableRow";
import { getOrders } from "../../../redux/actions/admin/ordersAction";
import SalesChart from "../Components/DashboardComponents/SalesChart";
import ProfitChart from "../Components/DashboardComponents/ProfitChart";
import UserChart from "../Components/DashboardComponents/UserChart";
import RevenueChart from "../Components/DashboardComponents/RevenueChart";
import MostSoldChart from "../Components/DashboardComponents/MostSoldChart";
import Modal from "../../../components/Modal";
import UpdateOrder from "./Order/UpdateOrder";
import { AiOutlineCalendar } from "react-icons/ai";
import OutsideTouchCloseComponent from "../../../components/OutsideTouchCloseComponent";
import { debounce } from "time-loom";
import { useSearchParams } from "react-router-dom";

const AdminHome = () => {
  const { orders, loading, error } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const [numberOfDates, setNumberOfDates] = useState(7);

  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = debounce(() => {
    setDropDown(!dropDown);
  }, 100);

  useEffect(() => {
    dispatch(getOrders({}));
  }, []);

  // Update Orders
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
      <div className="p-5 w-full overflow-auto">
        <div className="flex justify-between items-center text-xs font-semibold pb-5">
          <div>
            <h1 className="font-bold text-2xl">Dashboard</h1>
          </div>
          <div className="flex gap-3 relative">
            <button
              className="admin-button-fl bg-white hover:bg-gray-200 active:bg-gray-300 text-sm"
              onClick={toggleDropDown}
            >
              <AiOutlineCalendar />
              Last {numberOfDates} days
            </button>
            {dropDown && (
              <OutsideTouchCloseComponent
                toggleVisibility={toggleDropDown}
                style="absolute top-10 right-0 font-normal w-44 bg-white rounded-lg shadow-2xl"
              >
                <button
                  className="navbar-drop-ul w-full"
                  onClick={() => {
                    setNumberOfDates(7);
                    toggleDropDown();
                  }}
                >
                  Last 7 Days
                </button>
                <button
                  className="navbar-drop-ul w-full"
                  onClick={() => {
                    setNumberOfDates(30);
                    toggleDropDown();
                  }}
                >
                  Last 30 Days
                </button>
                <button
                  className="navbar-drop-ul w-full"
                  onClick={() => {
                    setNumberOfDates(180);
                    toggleDropDown();
                  }}
                >
                  Last 180 Days
                </button>
                <button
                  className="navbar-drop-ul w-full"
                  onClick={() => {
                    setNumberOfDates(365);
                    toggleDropDown();
                  }}
                >
                  Last 365 Days
                </button>
              </OutsideTouchCloseComponent>
            )}
          </div>
        </div>

        <div className="flex lg:flex-row flex-col gap-5 mb-5">
          <SalesChart numberOfDates={numberOfDates} />
          <ProfitChart numberOfDates={numberOfDates} />
          <UserChart numberOfDates={numberOfDates} />
        </div>

        <div className="flex gap-5 lg:flex-row flex-col">
          <RevenueChart numberOfDates={numberOfDates} />
          <div className="bg-white p-5 rounded-md w-full lg:w-1/3">
            <h1 className="text-lg font-bold">Most Sold Items</h1>
            <MostSoldChart numberOfDates={numberOfDates} />
          </div>
        </div>
        {orders && orders.length > 0 ? (
          <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg my-5">
            <h1 className="px-5 pt-5 font-bold text-lg">Latest Orders</h1>
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
                {orders.slice(0, 5).map((item, index) => {
                  const isLast = index === orders.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-200 ";
                  return (
                    <OrderTableRow
                      index={index + 1}
                      item={item}
                      toggleUpdateModal={toggleUpdateModal}
                      classes={classes}
                      key={index}
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

export default AdminHome;
