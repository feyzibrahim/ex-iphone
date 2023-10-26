import React from "react";
import { BiBadgeCheck, BiCheckShield, BiPhoneCall } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";

const DescReview = ({ description }) => {
  return (
    <div className="bg-white mt-5">
      <div className="flex justify-center gap-8 py-3 border-b ">
        <button className="uppercase text-sm font-semibold">Description</button>
        <button className="uppercase text-sm font-semibold">Review</button>
      </div>
      <div className="p-5 lg:flex gap-5">
        <div className="w-full">
          <h1 className="font-semibold my-2">Description</h1>
          <p className="text-sm text-gray-500"> {description}</p>
        </div>
        <div className="shrink-0">
          <ul>
            <li className="font-semibold my-2">Feature</li>
            <li className="description-ul">
              <span className="text-blue-700 text-xl">
                <BiBadgeCheck />
              </span>
              Free 1 Month Warranty
            </li>
            <li className="description-ul">
              <span className="text-blue-700 text-xl">
                <FaShippingFast />
              </span>
              Free Shipping & Faster Delivery
            </li>
            <li className="description-ul">
              <span className="text-blue-700 text-xl">
                <BiCheckShield />
              </span>
              100% Money-back guarantee
            </li>
            <li className="description-ul">
              <span className="text-blue-700 text-xl">
                <BiPhoneCall />
              </span>
              24/7 Customer Support
            </li>
            <li className="description-ul">
              <span className="text-blue-700 text-xl">
                <RiSecurePaymentLine />
              </span>
              Secure payment method
            </li>
          </ul>
        </div>
        <div className="text-gray-500 shrink-0">
          <ul>
            <li className="font-semibold text-black my-2">
              Shipping information
            </li>
            <li>
              <span className="text-black py-1">Courier:</span> 2 - 4 days, free
              shipping
            </li>
            <li>
              <span className="text-black py-1">Local Shipping: </span>
              up to one week, 200₹
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DescReview;
