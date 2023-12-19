import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { lineChartNoDecoration } from "@common/configurations";
import axios from "axios";
import { URL } from "@common/api";
import { config } from "@common/configurations";

const SalesChart = ({ numberOfDates }) => {
  const [totalSales, setTotalSales] = useState("");
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(
        `${URL}/admin/sales-report${
          numberOfDates ? `?numberOfDates=${numberOfDates}` : ``
        }`,
        config
      );

      if (data) {
        setTotalSales(data.totalProductsCount);
        const arr = data.productsByDay.map((item) => item.totalProductsCount);
        const labelArray = data.productsByDay.map((item) => item._id);
        setData(arr);
        setLabels(labelArray);
      }
    };
    loadData();
  }, [numberOfDates]);

  return (
    <div className="bg-white p-5 rounded-md w-full flex justify-between">
      <div>
        <h3 className="font-semibold text-gray-700 text-sm">Sales</h3>
        <h1 className="text-2xl font-semibold">{totalSales || 0}</h1>
        <p className="font-semibold text-sm text-gray-500">
          Products sold so for
        </p>
      </div>
      <div className="w-36">
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "Revenue",
                data: data,
                backgroundColor: "#3B82F6",
                borderColor: "#3B82F6",
                borderWidth: 3,
              },
            ],
          }}
          options={lineChartNoDecoration}
        />
      </div>
    </div>
  );
};

export default SalesChart;
