import React from "react";
import { useSelector } from "react-redux";

const TotalAndSubTotal = () => {
  const { totalPrice, shipping, discount, tax } = useSelector(
    (state) => state.cart
  );

  return (
    <>
      <div className="border-b border-gray-200 pb-2 mb-2">
        <div className="cart-total-li">
          <p className="cart-total-li-first">Sub Total</p>
          <p className="cart-total-li-second">{totalPrice}₹</p>
        </div>
        <div className="cart-total-li">
          <p className="cart-total-li-first">Shipping</p>
          <p className="cart-total-li-second">
            {shipping === 0 ? "Free" : shipping}
          </p>
        </div>
        <div className="cart-total-li">
          <p className="cart-total-li-first">Discount</p>
          <p className="cart-total-li-second">{discount}₹</p>
        </div>
        <div className="cart-total-li">
          <p className="cart-total-li-first">Tax</p>
          <p className="cart-total-li-second">{tax}₹</p>
        </div>
      </div>
      <div className="cart-total-li">
        <p className="font-semibold text-gray-500">Total</p>
        <p className="font-semibold">
          {totalPrice + discount + tax + shipping}₹
        </p>
      </div>
    </>
  );
};

export default TotalAndSubTotal;
