import React from "react";

const StatusComponent = ({ status }) => {
  let styleVar = "px-3 py-1 rounded-lg capitalize w-fit text-sm font-semibold ";
  if (status === "pending" || status === "draft") {
    styleVar += "bg-cyan-100 text-cyan-600";
  }

  if (status === "processing" || status === "low quantity") {
    styleVar += "bg-orange-100 text-orange-600";
  }

  if (
    status === "shipped" ||
    status === "unpublished" ||
    status === "return approved"
  ) {
    styleVar += "bg-gray-100 text-gray-600";
  }

  if (
    status === "delivered" ||
    status === "Active" ||
    status === "published" ||
    status === "success" ||
    status === "pickup completed"
  ) {
    styleVar += "bg-green-100 text-green-600";
  }

  if (
    status === "cancelled" ||
    status === "Blocked" ||
    status === "out of stock" ||
    status === "return rejected"
  ) {
    styleVar += "bg-red-100 text-red-400";
  }

  if (status === "returned") {
    styleVar += "bg-yellow-100 text-yellow-600";
  }

  if (status === "return request" || status === "refunded") {
    styleVar += "bg-amber-100 text-amber-600";
  }

  return <p className={`${styleVar}`}>{status}</p>;
};

export default StatusComponent;
