import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { GiPayMoney } from "react-icons/gi";
import { BiWallet } from "react-icons/bi";
import axios from "axios";
import { URL } from "../../Common/links";
import { config } from "../../Common/configurations";
import CheckoutCartRow from "./components/CheckoutCartRow";
import AddressCheckoutSession from "./components/AddressCheckoutSession";
import TotalAndSubTotal from "./components/TotalAndSubTotal";
import Loading from "../../components/Loading";
import OrderConfirmation from "./components/OrderConfirmation";
import { clearCartOnOrderPlaced } from "../../redux/reducers/user/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();

  // Cart from Redux
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { totalPrice, shipping, discount, tax } = useSelector(
    (state) => state.cart
  );

  // Address Selection
  const [selectedAddress, setSelectedAddress] = useState("");
  // Payment Selection
  const [selectedPayment, setSelectedPayment] = useState(null);
  const handleSelectedPayment = (e) => {
    setSelectedPayment(e.target.value);
  };
  // Additional Note
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Page switching
  const [orderPlacedLoading, setOrderPlacedLoading] = useState(false);
  const [confirmationPage, setConfirmationPage] = useState(false);
  const [orderData, setOrderData] = useState({});

  // Saving the order to db

  const saveOrder = async (response) => {
    setOrderPlacedLoading(true);

    try {
      // Make the first POST request to create the order
      const orderResponse = await axios.post(
        `${URL}/user/order`,
        {
          notes: additionalNotes,
          address: selectedAddress,
          paymentMode: selectedPayment,
        },
        config
      );

      const { order } = orderResponse.data;

      // Make the second POST request to verify payment with Razorpay and save that to database
      await axios.post(
        `${URL}/user/razor-verify`,
        { ...response, order: order._id },
        config
      );

      // Updating user side
      setOrderData(order);
      toast.success("Order Placed");
      setOrderPlacedLoading(false);
      setConfirmationPage(true);
      dispatch(clearCartOnOrderPlaced());
    } catch (error) {
      // Error Handling
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setOrderPlacedLoading(false);
    }
  };

  const saveOrderOnCashDelivery = async (response) => {
    setOrderPlacedLoading(true);

    try {
      // Make the first POST request to create the order
      const order = await axios.post(
        `${URL}/user/order`,
        {
          notes: additionalNotes,
          address: selectedAddress,
          paymentMode: selectedPayment,
        },
        config
      );

      // Updating user side
      setOrderData(order.data.order);
      toast.success("Order Placed");
      setOrderPlacedLoading(false);
      setConfirmationPage(true);
      dispatch(clearCartOnOrderPlaced());
    } catch (error) {
      // Error Handling
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setOrderPlacedLoading(false);
    }
  };

  // Razor Pay payment
  const initiateRazorPayPayment = async () => {
    // Getting razor-pay secret key
    const {
      data: { key },
    } = await axios.get(`${URL}/user/razor-key`);

    // making razor-pay order
    const {
      data: { order },
    } = await axios.post(
      `${URL}/user/razor-order`,
      { amount: parseInt((totalPrice + discount + tax + shipping) / 100) },
      config
    );

    // setting razor pay configurations
    let options = {
      key: key,
      amount: parseInt((totalPrice + discount + tax + shipping) / 100),
      currency: "INR",
      name: "ex.iphones",
      description: "Test Transaction",
      image: "http://localhost:4000/off/logo.png",
      order_id: order.id,
      handler: function (response) {
        saveOrder(response);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razor pay Corporate Office",
      },
      theme: {
        color: "#2b2b30",
      },
    };

    // enabling razor-pay payment screen
    const razor = new window.Razorpay(options);

    razor.open();

    // If failed toast it.
    razor.on("payment.failed", function (response) {
      toast.error(response.error.code);
      toast.error(response.error.description);
      toast.error(response.error.source);
      toast.error(response.error.step);
      toast.error(response.error.reason);
      toast.error(response.error.metadata.order_id);
      toast.error(response.error.metadata.payment_id);
      setOrderPlacedLoading(false);
    });
  };

  // Order placing
  const placeOrder = async () => {
    // Validating before placing an order
    if (cart.length === 0) {
      toast.error("Add product to cart");
      return;
    }
    if (!selectedAddress) {
      toast.error("Delivery address not found");
      return;
    }
    if (!selectedPayment) {
      toast.error("Please select a payment mode");
      return;
    }

    if (selectedPayment === "razorPay") {
      initiateRazorPayPayment();
      return;
    }

    saveOrderOnCashDelivery();
  };

  return (
    <>
      {orderPlacedLoading ? (
        <Loading />
      ) : confirmationPage ? (
        <OrderConfirmation orderData={orderData} />
      ) : (
        <div className="pt-20 px-5 lg:p-20 lg:flex items-start gap-5 bg-gray-100">
          <div className="lg:w-3/4">
            <AddressCheckoutSession
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <div className="bg-white my-5 p-5 rounded">
              <h1 className="text-xl font-semibold border-b pb-2 mb-3">
                Payment Option
              </h1>
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
                </label>
              </div>
            </div>

            <p className="my-1 font-semibold">Additional Notes</p>
            <textarea
              placeholder="Notes about your order e.g. special notes for delivery"
              className="w-full h-40 px-3 py-2 outline-none rounded resize-none"
              value={additionalNotes}
              onChange={(e) => {
                setAdditionalNotes(e.target.value);
              }}
            ></textarea>
          </div>

          {/* Order Summery Session */}

          <div className="lg:w-1/4 bg-white px-5 py-3 border border-gray-200 rounded shrink-0">
            <h1 className="font-semibold py-2">Order Summery</h1>
            <div className="py-1">
              {cart &&
                cart.map((item, index) => (
                  <CheckoutCartRow item={item} key={index} />
                ))}
            </div>
            <TotalAndSubTotal />
            <button
              className="btn-blue w-full text-white uppercase font-semibold text-sm my-5"
              onClick={placeOrder}
            >
              Place order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
