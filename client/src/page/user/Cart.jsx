import React, { useEffect, useState } from "react";
import Quantity from "./components/Quantity";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  deleteEntireCart,
} from "../../redux/actions/user/cartActions";
import { URL } from "../../Common/links";
import { increment, decrement } from "../../redux/reducers/user/cartSlice";
import ConfirmModel from "../../components/ConfirmModal";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, loading, error, cartId } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const dispatchIncrement = (item) => {
    dispatch(increment({ item }));
  };
  const dispatchDecrement = (item) => {
    dispatch(decrement({ item }));
  };
  const deleteCart = () => {
    toggleConfirm();
    dispatch(deleteEntireCart(cartId));
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const toggleConfirm = () => {
    if (cart.length > 0) {
      setShowConfirm(!showConfirm);
    } else {
      toast.error("Nothing in the cart");
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmModel
          title="Confirm Delete?"
          positiveAction={deleteCart}
          negativeAction={toggleConfirm}
        />
      )}
      <div className="bg-gray-100 flex lg:flex-row flex-col gap-5 lg:px-28 px-5 py-20">
        <div className="lg:w-2/3 bg-white border border-gray-200">
          <div className=" px-5 py-3 border-b flex justify-between">
            <h1 className="text-lg font-semibold">Shopping Cart</h1>
            <button
              onClick={toggleConfirm}
              className="flex items-center bg-gray-100 px-2 rounded hover:bg-gray-300 gap-2"
            >
              <AiOutlineDelete />
              Clear
            </button>
          </div>
          <div className="overflow-x-auto h-full">
            {cart.length > 0 ? (
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="cart-table-header w-3/6">Products</th>
                    <th className="cart-table-header w-1/6">Price</th>
                    <th className="cart-table-header w-1/6">Quantity</th>
                    <th className="cart-table-header w-1/6">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    const isLast = index === cart.length - 1;

                    return (
                      <tr key={index} className={isLast ? "" : "border-b"}>
                        <td className="cart-table-row ">
                          <div className="flex items-center gap-3">
                            <IoMdCloseCircleOutline className="text-xl" />
                            {item.product.imageURL ? (
                              <div className="w-12 h-12">
                                <img
                                  src={`${URL}/img/${item.product.imageURL}`}
                                  alt="asdfas"
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                            )}
                            {item.product.name}
                          </div>
                        </td>
                        <td className="cart-table-row">{item.product.price}</td>
                        <td className="cart-table-row">
                          <Quantity
                            count={item.quantity}
                            increment={() => dispatchIncrement(item)}
                            decrement={() => dispatchDecrement(item)}
                          />
                        </td>
                        <td className="cart-table-row">
                          {item.product.price * item.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Nothing in this cart</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white p-5 mb-5  border border-gray-200">
            <h3 className="text-lg font-semibold">Cart Total</h3>
            <div className="border-b border-gray-200 pb-2 mb-2">
              <div className="cart-total-li">
                <p className="cart-total-li-first">Sub Total</p>
                <p className="cart-total-li-second">129932₹</p>
              </div>
              <div className="cart-total-li">
                <p className="cart-total-li-first">Shipping</p>
                <p className="cart-total-li-second">Free</p>
              </div>
              <div className="cart-total-li">
                <p className="cart-total-li-first">Discount</p>
                <p className="cart-total-li-second">999₹</p>
              </div>
              <div className="cart-total-li">
                <p className="cart-total-li-first">Tax</p>
                <p className="cart-total-li-second">2999₹</p>
              </div>
            </div>
            <div className="cart-total-li">
              <p className="font-semibold text-gray-500">Total</p>
              <p className="font-semibold">2999₹</p>
            </div>
            <button className="btn-blue w-full text-white uppercase font-semibold text-sm my-5">
              Proceed to checkout
            </button>
          </div>
          <div className="bg-white border border-gray-200">
            <h3 className="p-5 border-b border-gray-200">Coupon Code</h3>
            <div className="p-5">
              <input
                type="text"
                className="w-full py-2 px-3 rounded border border-gray-200"
                placeholder="Enter Coupon Code"
              />
              <button className="btn-blue-border my-3">Apply Coupon</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
