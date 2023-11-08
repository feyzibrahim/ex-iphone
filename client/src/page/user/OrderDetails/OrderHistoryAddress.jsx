import React from "react";

const OrderHistoryAddress = ({ title, address }) => {
  return (
    <div className="border-b lg:border-b-0 lg:border-r p-5 lg:w-1/3">
      <h1 className="text-xl">{title}</h1>
      <p className="pt-5 pb-2">
        {address.firstName} {address.lastName}{" "}
      </p>
      <p className="text-gray-500">
        {address.address}, {address.country}, {address.regionState},{" "}
        {address.city}, Pin Code: {address.pinCode}
      </p>
      <p className="py-2">
        Phone Number:{" "}
        <span className="text-gray-500">{address.phoneNumber}</span>
      </p>
      <p className="py-2">
        Email:{" "}
        <span className="text-gray-500">
          {address.email || "Email is not provided"}
        </span>
      </p>
    </div>
  );
};

export default OrderHistoryAddress;
