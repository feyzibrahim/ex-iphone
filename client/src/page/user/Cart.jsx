import React, { useEffect, useState } from "react";
import Quantity from "./components/Quantity";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  deleteEntireCart,
  deleteOneProduct,
} from "../../redux/actions/user/cartActions";
import { URL } from "../../Common/links";
import {
  increment,
  decrement,
  calculateTotalPrice,
} from "../../redux/reducers/user/cartSlice";
import ConfirmModel from "../../components/ConfirmModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, loading, error, cartId, totalPrice, shipping, discount, tax } =
    useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [cart]);

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

  const [productId, setProductId] = useState("");
  const dispatchDeleteProduct = () => {
    dispatch(deleteOneProduct({ cartId, productId }));
    toggleProductConfirm("");
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const toggleConfirm = () => {
    if (cart.length > 0) {
      setShowConfirm(!showConfirm);
    } else {
      toast.error("Nothing in the cart");
    }
  };

  const [showProductConfirm, setShowProductConfirm] = useState(false);
  const toggleProductConfirm = (id) => {
    setProductId(id);
    setShowProductConfirm(!showProductConfirm);
  };

  return (
    <>
      {showConfirm && (
        <ConfirmModel
          title="Confirm Clearing Cart?"
          positiveAction={deleteCart}
          negativeAction={toggleConfirm}
        />
      )}
      {showProductConfirm && (
        <ConfirmModel
          title="Confirm Delete?"
          positiveAction={dispatchDeleteProduct}
          negativeAction={() => toggleProductConfirm("")}
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
                    <th className="cart-table-header w-5/12">Products</th>
                    <th className="cart-table-header w-2/12">Price</th>
                    <th className="cart-table-header w-2/12">Quantity</th>
                    <th className="cart-table-header w-2/12">Total</th>
                    <th className="cart-table-header w-1/12"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    const isLast = index === cart.length - 1;

                    return (
                      <tr key={index} className={isLast ? "" : "border-b"}>
                        <td className="cart-table-row">
                          <div className="flex items-center gap-3 truncate">
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
                        <td>
                          <div
                            onClick={() =>
                              toggleProductConfirm(item.product._id)
                            }
                            className="cursor-pointer"
                          >
                            <AiOutlineDelete className="text-xl" />
                          </div>
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
        {/* Cart total details */}
        <div className="lg:w-1/3">
          <div className="bg-white p-5 mb-5  border border-gray-200">
            <h3 className="text-lg font-semibold">Cart Total</h3>
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
            <button
              className="btn-blue w-full text-white uppercase font-semibold text-sm my-5"
              onClick={() => {
                if (cart.length > 0) {
                  navigate("/checkout");
                } else {
                  toast.error("No product in cart");
                }
              }}
            >
              Proceed to checkout
            </button>
          </div>
          {/* Coupon session */}
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
