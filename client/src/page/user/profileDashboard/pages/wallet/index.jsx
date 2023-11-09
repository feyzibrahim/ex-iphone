import React from "react";

const Wallet = () => {
  return (
    <div className="bg-white rounded-lg w-full">
      <h1 className="uppercase text-lg font-semibold px-5 py-3 border-b">
        Wallet
      </h1>
      <div className="p-5">
        <table className="w-full min-w-max table-auto text-sm border">
          <thead>
            <tr className="bg-gray-100 font-semibold">
              <td className="px-5 py-2">Transaction Id</td>
              <td className="px-5 py-2">Amount</td>
              <td className="px-5 py-2">Type</td>
              <td className="px-5 py-2">Description</td>
              <td className="px-5 py-2">Time</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Wallet;
