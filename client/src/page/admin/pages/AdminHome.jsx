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

const AdminHome = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);

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
        <h1 className="font-bold text-2xl mb-5">Dashboard</h1>

        <div className="flex lg:flex-row flex-col gap-5 mb-5">
          <SalesChart />
          <ProfitChart />
          <UserChart />
        </div>

        <div className="flex gap-5 lg:flex-row flex-col">
          <RevenueChart />
          <div className="bg-white p-5 rounded-md w-full lg:w-1/3">
            <h1 className="text-lg font-bold">Most Sold Items</h1>
            <MostSoldChart />
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
                      index={index}
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
