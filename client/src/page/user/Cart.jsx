import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  deleteEntireCart,
  deleteOneProduct,
  applyCoupon,
} from "../../redux/actions/user/cartActions";
import { calculateTotalPrice } from "../../redux/reducers/user/cartSlice";
import ConfirmModel from "../../components/ConfirmModal";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import CartProductRow from "./components/CartProductRow";
import TotalAndSubTotal from "./components/TotalAndSubTotal";
import JustLoading from "../../components/JustLoading";
import EmptyCart from "../../assets/emptyCart.png";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error, cartId, couponCode } = useSelector(
    (state) => state.cart
  );

  const [inputCouponCode, setInputCouponCode] = useState("");

  // Fetching entire cart on page load
  useEffect(() => {
    dispatch(getCart());
  }, []);

  // Calculating the total with the data and updating it when ever there is a change
  useEffect(() => {
    dispatch(calculateTotalPrice());
    setInputCouponCode(couponCode);
  }, [cart]);

  // Applying coupon to cart

  const dispatchApplyCoupon = () => {
    if (inputCouponCode.trim() !== "") {
      // console.log();
      dispatch(applyCoupon(inputCouponCode.trim()));
    }
  };

  // Deleting entire cart
  const deleteCart = () => {
    toggleConfirm();
    dispatch(deleteEntireCart(cartId));
  };

  // Modal for deleting entire cart
  const [showConfirm, setShowConfirm] = useState(false);
  const toggleConfirm = () => {
    if (cart.length > 0) {
      setShowConfirm(!showConfirm);
    } else {
      toast.error("Nothing in the cart");
    }
  };

  // Deleting one product
  const [productId, setProductId] = useState("");
  const dispatchDeleteProduct = () => {
    dispatch(deleteOneProduct({ cartId, productId }));
    toggleProductConfirm("");
  };

  // Modal for deleting one product from cart
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
      {cart.length > 0 ? (
        <>
          <div className="bg-gray-100 flex lg:flex-row flex-col gap-5 lg:px-28 px-5 py-20 min-h-screen">
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
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <JustLoading size={10} />
                  </div>
                ) : cart.length > 0 ? (
                  <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="cart-table-header">Products</th>
                        <th className="cart-table-header">Price</th>
                        <th className="cart-table-header">Quantity</th>
                        <th className="cart-table-header">Total</th>
                        <th className="cart-table-header"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => {
                        const isLast = index === cart.length - 1;

                        return (
                          <CartProductRow
                            item={item}
                            toggleProductConfirm={toggleProductConfirm}
                            isLast={isLast}
                            key={index}
                          />
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
                <TotalAndSubTotal />
                <button
                  className="btn-blue w-full text-white uppercase font-semibold text-sm"
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
                    value={inputCouponCode}
                    onChange={(e) => setInputCouponCode(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <button
                      className="btn-blue-border my-3"
                      onClick={dispatchApplyCoupon}
                    >
                      Apply Coupon
                    </button>
                    <button
                      className="flex items-center gap-2 hover:text-blue-500 hover:underline"
                      onClick={() => navigate("/dashboard/find-coupons")}
                    >
                      Find <BiSearchAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <img
              src={EmptyCart}
              alt="Empty Cart Icon"
              className="w-full lg:w-1/2"
            />
            <p className="text-gray-500 mt-4 text-lg">Your cart is empty</p>
            <Link to="/" className="py-2 text-blue-500 hover:underline text-sm">
              Go back to shopping
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
