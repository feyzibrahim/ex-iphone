import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { lineChartNoDecoration } from "@common/configurations";
import axios from "axios";
import { URL } from "@common/api";
import { config } from "@common/configurations";

const UserChart = ({ numberOfDates }) => {
  const [total, setTotal] = useState("");
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(
        `${URL}/admin/user-count${
          numberOfDates ? `?numberOfDates=${numberOfDates}` : ``
        }`,
        config
      );

      if (data) {
        setTotal(data.userCount);
        const arr = data.userCountsByDay.map((item) => item.count);
        const labelArray = data.userCountsByDay.map((item) => item._id);
        setData(arr);
        setLabels(labelArray);
      }
    };
    loadData();
  }, [numberOfDates]);

  return (
    <div className="bg-white p-5 rounded-md w-full flex justify-between">
      <div>
        <h3 className="font-semibold text-gray-700 text-sm">
          User Acquisition
        </h3>
        <h1 className="text-2xl font-semibold">{total}</h1>
        <p className="font-semibold text-sm text-gray-500">
          Users signed up so far
        </p>
      </div>
      <div className="w-36">
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "User Acquisition",
                data: data,
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
  );
};

export default UserChart;
