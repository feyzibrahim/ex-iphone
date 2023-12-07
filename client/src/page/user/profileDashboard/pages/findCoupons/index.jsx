import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { URL } from "../../../../../Common/api";
import { config } from "../../../../../Common/configurations";
import axios from "axios";
import date from "date-and-time";
import toast from "react-hot-toast";
import JustLoading from "../../../../../components/JustLoading";

const FindCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { data } = await axios.get(`${URL}/user/coupons`, config);
      setCoupons(data.coupons);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg mx-5 lg:mx-0">
        <div className="border-b px-5">
          <h1 className="uppercase text-lg font-semibold py-3 ">
            Find Coupons
          </h1>
        </div>

        <div className="p-5 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center">
              <JustLoading size={10} />
            </div>
          ) : coupons.length > 0 ? (
            <table className="w-full min-w-max table-auto text-sm border">
              <thead>
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-5 py-3">Coupon Code</td>
                  <td className="px-5 py-3">Description</td>
                  <td className="px-5 py-3">Offer</td>
                  <td className="px-5 py-3">Expiry Date</td>
                  <td className="px-5 py-3">Copy</td>
                </tr>
              </thead>
              <tbody>
                {coupons &&
                  coupons.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-5 py-3 ">{item.code}</td>
                        <td className="px-5 py-3">{item.description}</td>
                        <td className="px-5 py-3">
                          {item.value}
                          {item.type === "percentage" ? "%" : "₹"} Off
                        </td>
                        <td className="px-5 py-3">
                          {date.format(
                            new Date(item.expirationDate),
                            "MMM DD YYYY"
                          )}
                        </td>
                        <td className="px-5 py-3 text-xl">
                          <MdContentCopy
                            className="hover:text-gray-500 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(item.code);
                              toast.success("Code copied to clipboard");
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No coupons are available now</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindCoupons;
