import React from "react";
import AddressProfile from "../../../components/AddressProfile";

const Addresses = () => {
  return (
    <div className="bg-white rounded-lg w-full mx-5 lg:mx-0">
      <h1 className="uppercase text-lg font-semibold px-5 py-3 border-b">
        Your addresses
      </h1>
      <AddressProfile />
    </div>
  );
};

export default Addresses;
