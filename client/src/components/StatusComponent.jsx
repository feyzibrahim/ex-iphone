import React from "react";

const StatusComponent = ({ status }) => {
  let styleVar = "px-3 py-1 rounded-lg capitalize w-fit text-sm font-semibold ";
  if (status === "pending") {
    styleVar += "bg-cyan-100 text-cyan-600";
  }

  if (status === "processing") {
    styleVar += "bg-orange-100 text-orange-600";
  }

  if (status === "shipped") {
    styleVar += "bg-gray-100 text-gray-600";
  }

  if (status === "delivered" || status === "Active") {
    styleVar += "bg-green-100 text-green-600";
  }

  if (status === "cancelled" || status === "Blocked") {
    styleVar += "bg-red-100 text-red-400";
  }

  if (status === "returned") {
    styleVar += "bg-yellow-100 text-yellow-600";
  }

  return <div className={styleVar}>{status}</div>;
};

export default StatusComponent;
