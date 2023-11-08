import React from "react";
import { getStatusDate, getStatusReason } from "../../../Common/functions";
import date from "date-and-time";

const OrderDates = ({ orderData }) => {
  if (orderData.status === "delivered") {
    return (
      <p>
        <span className="text-gray-500">Product Delivered on </span>
        {getStatusDate("delivered", orderData.statusHistory)}
      </p>
    );
  }

  if (orderData.status === "cancelled") {
    return (
      <div>
        <p>
          <span className="text-gray-500">Order cancelled on </span>
          {getStatusDate("cancelled", orderData.statusHistory)}
        </p>
        <p className="line-clamp-1">
          <span className="text-gray-500">Cancellation Reason: </span>
          {getStatusReason("cancelled", orderData.statusHistory)}
        </p>
      </div>
    );
  }

  if (orderData.status === "awaiting return approval") {
    return (
      <div>
        <p>
          <span className="text-gray-500">Return request made on: </span>
          {getStatusDate("awaiting return approval", orderData.statusHistory)}
        </p>
        <p className="line-clamp-1">
          <span className="text-gray-500">Cancellation Reason: </span>
          {getStatusReason("awaiting return approval", orderData.statusHistory)}
        </p>
      </div>
    );
  }

  return (
    <p>
      <span className="text-gray-500">Order expected arrival </span>
      {date.format(new Date(orderData.deliveryDate), "MMM DD, YYYY")}
    </p>
  );
};

export default OrderDates;
