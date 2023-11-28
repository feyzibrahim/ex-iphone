import React, { useEffect } from "react";
import { AiOutlineWallet } from "react-icons/ai";
import { getWallet } from "../../../../../redux/actions/user/walletActions";
import { useDispatch, useSelector } from "react-redux";
import date from "date-and-time";
import JustLoading from "../../../../../components/JustLoading";

const Wallet = () => {
  const dispatch = useDispatch();
  const { wallet, loading, error } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(getWallet());
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <JustLoading size={10} />
        </div>
      ) : (
        <div className="bg-white rounded-lg mx-5 lg:mx-0">
          <h1 className="uppercase text-lg font-semibold px-5 py-3 border-b">
            Wallet
          </h1>
          <div className="flex items-center justify-between px-5 py-2">
            <div className="flex gap-3 items-center">
              <AiOutlineWallet className="text-6xl text-gray-500" />
              <div>
                <h1 className="text-3xl font-bold">
                  {wallet ? `₹${wallet.balance}` : "N/A"}
                </h1>
                <p className="text-sm text-gray-500 font-semibold">
                  My Wallet Balance
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-blue text-white">Add Money</button>
              <button className="btn-red text-white">Refund</button>
            </div>
          </div>
          <div className="p-5 overflow-auto">
            {wallet ? (
              <table className="w-full min-w-max table-auto text-sm border">
                <thead>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="px-5 py-3">Transaction Id</td>
                    <td className="px-5 py-3">Amount</td>
                    <td className="px-5 py-3">Type</td>
                    <td className="px-5 py-3">Description</td>
                    <td className="px-5 py-3">Date</td>
                  </tr>
                </thead>
                <tbody>
                  {wallet.transactions &&
                    wallet.transactions.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-5 py-3">{item._id}</td>
                          <td className="px-5 py-3">₹{item.amount}</td>
                          <td className="px-5 py-3 capitalize">{item.type}</td>
                          <td className="px-5 py-3 capitalize">
                            {item.description}
                          </td>
                          <td className="px-5 py-3">
                            {date.format(
                              new Date(item.createdAt),
                              "MMM DD YYYY"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>No Transactions</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
