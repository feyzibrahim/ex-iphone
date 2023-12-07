import React, { useEffect } from "react";
import { BiWallet } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import axios from "axios";
import { URL } from "../../../Common/api";
import { config } from "../../../Common/configurations";

const CheckoutPaymentOption = ({
  selectedPayment,
  handleSelectedPayment,
  walletBalance,
  setWalletBalance,
}) => {
  useEffect(() => {
    const fetchWalletBalance = async () => {
      const { data } = await axios.get(`${URL}/user/wallet-total`, config);

      setWalletBalance(data.balance);
    };
    fetchWalletBalance();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center py-5">
        <label className="cursor-pointer" htmlFor="cashOnDelivery">
          <div className="border-r px-5  flex flex-col items-center ">
            <div className="w-10 h-10 flex items-center justify-center">
              <GiPayMoney className="text-2xl" />
            </div>
            <p className="mb-2 text-sm">Cash On Delivery</p>
            <input
              type="radio"
              name="paymentMode"
              id="cashOnDelivery"
              value="cashOnDelivery"
              onChange={handleSelectedPayment}
              checked={selectedPayment === "cashOnDelivery"}
            />
          </div>
        </label>
        <label className="cursor-pointer" htmlFor="razorPay">
          <div className="border-r px-5 flex flex-col items-center">
            <div className="w-10 h-10">
              <img
                src="https://d6xcmfyh68wv8.cloudfront.net/assets/razorpay-glyph.svg"
                alt="Razor Pay Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mb-2 text-sm">Razer Pay</p>
            <input
              type="radio"
              name="paymentMode"
              id="razorPay"
              value="razorPay"
              onChange={handleSelectedPayment}
              checked={selectedPayment === "razorPay"}
            />
          </div>
        </label>
        <label className="cursor-pointer" htmlFor="myWallet">
          <div className="flex items-center">
            <div className="px-5 flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <BiWallet className="text-2xl" />
              </div>
              <p className="mb-2 text-sm">My Wallet</p>
              <input
                type="radio"
                name="paymentMode"
                id="myWallet"
                value="myWallet"
                onChange={handleSelectedPayment}
                checked={selectedPayment === "myWallet"}
              />
            </div>
          </div>
        </label>
      </div>

      <p className="bg-blue-100 p-2 rounded-lg text-center">
        Your wallet Balance:{" "}
        <span className="font-semibold">{walletBalance || 0}₹</span>
      </p>
    </>
  );
};

export default CheckoutPaymentOption;
