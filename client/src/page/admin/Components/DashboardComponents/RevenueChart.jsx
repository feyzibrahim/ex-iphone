import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { lineChartNoGridNoLegend } from "@common/configurations";
import axios from "axios";
import { URL } from "@common/api";
import { config } from "@common/configurations";

const RevenueChart = ({ numberOfDates }) => {
  const [totalSales, setTotalSales] = useState("");
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [profits, setProfits] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(
        `${URL}/admin/revenue-report${
          numberOfDates ? `?numberOfDates=${numberOfDates}` : ``
        }`,
        config
      );

      if (data) {
        setTotalSales(data.salesSum.totalSales);
        const arr = data.eachDayData.map((item) => item.totalSum);
        const labelArray = data.eachDayData.map((item) => item._id);
        const profitsArray = data.eachDayData.map((item) => item.totalMarkup);
        setData(arr);
        setLabels(labelArray);
        setProfits(profitsArray);
      }
    };
    loadData();
  }, [numberOfDates]);

  return (
    <div className="bg-white px-5 pt-5 pb-20 rounded-md w-full lg:w-2/3 h-80">
      <h1 className="text-lg font-bold">Total Revenue</h1>
      <p className="mb-2">₹{totalSales || 0}</p>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Revenue",
              data: data,
              backgroundColor: "#3B82F6",
              borderRadius: 3,
            },
            {
              label: "Profit",
              data: profits,
              backgroundColor: "#D1D5DB",
              borderRadius: 3,
            },
          ],
        }}
        options={lineChartNoGridNoLegend}
      />
    </div>
  );
};

export default RevenueChart;
