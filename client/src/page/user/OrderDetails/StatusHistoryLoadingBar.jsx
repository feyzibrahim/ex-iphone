import React from "react";
import { TiTick } from "react-icons/ti";
import { BiDockLeft, BiPackage } from "react-icons/bi";
import { FaShippingFast, FaRegHandshake } from "react-icons/fa";

const StatusHistoryLoadingBar = ({ statusHistory }) => {
  let loadingPercentage = 0;

  if (statusHistory.length === 2) {
    loadingPercentage = 35;
  }
  if (statusHistory.length === 3) {
    loadingPercentage = 68;
  }
  if (statusHistory.length === 4) {
    loadingPercentage = 100;
  }

  const list = [
    { name: "Order Placed", icon: <BiDockLeft /> },
    { name: "Packaging", icon: <BiPackage /> },
    { name: "Shipped", icon: <FaShippingFast /> },
    { name: "Delivered", icon: <FaRegHandshake /> },
  ];

  return (
    <div className="relative h-24">
      <div className="flex justify-between w-full ">
        {list.map((status, index) => (
          <div className=" flex flex-col items-center z-10" key={index}>
            <div
              key={index}
              className={`w-6 h-6  rounded-full flex justify-center items-center text-white ${
                index <= statusHistory.length - 1
                  ? "bg-blue-500"
                  : "border-4 border-blue-500 bg-white"
              }`}
            >
              {index <= statusHistory.length - 1 && <TiTick />}
            </div>
            <span className="text-2xl text-blue-500 mt-3">{status.icon}</span>
            <p className="text-sm font-semibold">{status.name}</p>
          </div>
        ))}
      </div>
      <div className="w-full px-8 absolute top-2">
        <div className="h-2 bg-blue-200 rounded-md">
          <div
            className="h-2 rounded-md bg-blue-500"
            style={{ width: `${loadingPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatusHistoryLoadingBar;
