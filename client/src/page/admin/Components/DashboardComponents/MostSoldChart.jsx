import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { URL } from "@common/api";
import { config } from "@common/configurations";

const MostSoldChart = ({ numberOfDates }) => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(
        `${URL}/admin/most-sold-product${
          numberOfDates ? `?numberOfDates=${numberOfDates}` : ``
        }`,
        config
      );

      if (data) {
        const arr = data.mostSoldProducts.map((item) => item.totalQuantitySold);
        const labelArray = data.mostSoldProducts.map((item) => item.name);
        setData(arr);
        setLabels(labelArray);
      }
    };
    loadData();
  }, [numberOfDates]);

  return (
    <div className="h-60">
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Most Sold Items",
              data: data,
              backgroundColor: "#3B82F6",
              borderRadius: 10,
              barThickness: 15,
            },
          ],
        }}
        options={{
          indexAxis: "y",
          maintainAspectRatio: false,
          plugins: {
            legend: false,
          },

          scales: {
            x: {
              display: false,
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
                maxRotation: 0, // Disable rotation for horizontal bar charts
                callback: function (value, index, values) {
                  const maxLength = 15;
                  const label = labels[index];
                  if (label.length > maxLength) {
                    return label.substring(0, maxLength - 3) + "...";
                  } else {
                    return label;
                  }
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default MostSoldChart;
