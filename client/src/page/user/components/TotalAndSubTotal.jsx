import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCoupon } from "../../../redux/actions/user/cartActions";

const TotalAndSubTotal = () => {
  const dispatch = useDispatch();

  const { totalPrice, shipping, discount, tax, couponType, couponCode } =
    useSelector((state) => state.cart);

  let offer = 0;

  if (couponType === "percentage") {
    offer = (totalPrice * discount) / 100;
  } else {
    offer = discount;
  }

  const finalTotal = totalPrice + shipping + parseInt(tax) - offer;

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
          <p className="cart-total-li-first">Tax</p>
          <p className="cart-total-li-second">{parseInt(tax)}₹</p>
        </div>
        <div className="cart-total-li">
          <p className="cart-total-li-first">Discount</p>
          <p className="cart-total-li-second">
            {discount}
            {discount !== ""
              ? couponType === "percentage"
                ? `% Off (${offer}₹)`
                : "₹ Off"
              : "0₹"}
          </p>
        </div>

        {couponCode !== "" && (
          <>
            <div className="cart-total-li bg-blue-100 p-2 rounded">
              <p className="cart-total-li-first">Coupon Applied</p>
              <p className="cart-total-li-first">{couponCode}</p>
            </div>
            <div className="flex flex-row-reverse text-xs">
              <button
                className="text-red-500 hover:bg-red-100 p-1 rounded font-semibold"
                onClick={() => dispatch(removeCoupon())}
              >
                Remove Coupon
              </button>
            </div>
          </>
        )}
      </div>
      <div className="cart-total-li">
        <p className="font-semibold text-gray-500">Total</p>
        <p className="font-semibold">{finalTotal}₹</p>
      </div>
    </>
  );
};

export default TotalAndSubTotal;
