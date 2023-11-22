import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { lineChartNoDecoration } from "@common/configurations";
import { lineChartNoGridNoLegend } from "@common/configurations";
import OrderTableRow from "../Components/OrderTableRow";
import { getOrders } from "../../../redux/actions/admin/ordersAction";

const AdminHome = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const toggleUpdateModal = () => {
    console.log("first");
  };

  return (
    <div className="p-5 w-full overflow-auto">
      <h1 className="font-bold text-2xl mb-5">Dashboard</h1>

      <div className="flex lg:flex-row flex-col gap-5 mb-5">
        <div className="bg-white p-5 rounded-md w-full flex justify-between">
          <div>
            <h3 className="font-semibold text-gray-700 text-sm">Sales</h3>
            <h1 className="text-2xl font-semibold">₹239200</h1>
            <p className="font-semibold text-sm text-gray-500">
              Sales made so for
            </p>
          </div>
          <div className="w-36">
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200, 300, 250, 400, 500, 100, 1000],
                    backgroundColor: "#3858D6",
                    borderColor: "#3858D6",
                    borderWidth: 3,
                  },
                ],
              }}
              options={lineChartNoDecoration}
            />
          </div>
        </div>
        <div className="bg-white p-5 rounded-md w-full flex justify-between">
          <div>
            <h3 className="font-semibold text-gray-700 text-sm">Profit</h3>
            <h1 className="text-2xl font-semibold">₹32900</h1>
            <p className="font-semibold text-sm text-gray-500">
              Profits made so for
            </p>
          </div>
          <div className="w-36">
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Profit",
                    data: [200, 300, 250, 400, 500, 100, 1000],
                    backgroundColor: "#38d64d",
                    borderColor: "#38d64d",
                    borderWidth: 3,
                  },
                ],
              }}
              options={lineChartNoDecoration}
            />
          </div>
        </div>
        <div className="bg-white p-5 rounded-md w-full flex justify-between">
          <div>
            <h3 className="font-semibold text-gray-700 text-sm">Count</h3>
            <h1 className="text-2xl font-semibold">499</h1>
            <p className="font-semibold text-sm text-gray-500">
              Total Users signed up so far
            </p>
          </div>
          <div className="w-36">
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200, 300, 290, 400, 500, 400, 550],
                    backgroundColor: "#f28f2c",
                    borderColor: "#f28f2c",
                    borderWidth: 3,
                  },
                ],
              }}
              options={lineChartNoDecoration}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="bg-white px-5 pt-5 pb-16 rounded-md w-2/3 h-80">
          <h1 className="mb-5 text-lg font-bold">Total Revenue</h1>
          <Bar
            data={{
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  label: "Revenue",
                  data: [
                    200, 300, 400, 300, 240, 600, 400, 300, 300, 500, 600, 700,
                  ],
                  backgroundColor: "#3858D6",
                  borderRadius: 3,
                },
                {
                  label: "Profit",
                  data: [50, 120, 50, 49, 59, 20, 60, 30, 50, 60, 250, 300],
                  backgroundColor: "#cdd1d4",
                  borderRadius: 3,
                },
              ],
            }}
            options={lineChartNoGridNoLegend}
          />
        </div>
        <div className="bg-white p-5 rounded-md w-1/3">
          <h1 className="mb-5 text-lg font-bold">Most Sold Items</h1>
          <div>
            <div className="flex justify-between items-center">
              <p>iPhone</p>
              <p>489</p>
            </div>
            <div className="h-3 rounded-full my-2 bg-gray-200">
              <div className="h-3 rounded-full bg-blue-500 w-2/3"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p>iPhone</p>
              <p>489</p>
            </div>
            <div className="h-3 rounded-full my-2 bg-gray-200">
              <div className="h-3 rounded-full bg-blue-500 w-3/5"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p>iPhone</p>
              <p>489</p>
            </div>
            <div className="h-3 rounded-full my-2 bg-gray-200">
              <div className="h-3 rounded-full bg-blue-500 w-1/5"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p>iPhone</p>
              <p>489</p>
            </div>
            <div className="h-3 rounded-full my-2 bg-gray-200">
              <div className="h-3 rounded-full bg-blue-500 w-4/5"></div>
            </div>
          </div>
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
  );
};

export default AdminHome;
