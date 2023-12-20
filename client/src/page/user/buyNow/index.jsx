import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import { URL } from "@common/api";
import { config } from "@common/configurations";
import CheckoutCartRow from "../components/CheckoutCartRow";
import AddressCheckoutSession from "../components/AddressCheckoutSession";
import Loading from "../../../components/Loading";
import OrderConfirmation from "../components/OrderConfirmation";
import { emptyBuyNowStore } from "../../../redux/reducers/user/buyNowSlice";
import CheckoutPaymentOption from "../components/CheckoutPaymentOption";

const BuyNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, quantity } = useSelector((state) => state.buyNow);

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, []);

  let offer = 0;
  let couponType = "s";
  let totalPrice = product ? product.price + product.markup : 0;
  let shipping = 0;
  let tax = parseInt(totalPrice * 0.08);
  let discount = 0;
  // let couponCode = "o";

  if (couponType === "percentage") {
    offer = (totalPrice * discount) / 100;
  } else {
    offer = discount;
  }

  const finalTotal = totalPrice + shipping + tax - offer;

  // Wallet balance
  const [walletBalance, setWalletBalance] = useState(0);

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
  // const [confirmationPage, setConfirmationPage] = useState(false);
  // const [orderData, setOrderData] = useState({});

  const navigateToOrderConfirmation = (orderD) => {
    if (orderD) {
      navigate("/order-confirmation", { state: orderD });
    }
  };

  // Cash on delivery or wallet balance
  const saveOrderOnCashDeliveryOrMyWallet = async (response) => {
    setOrderPlacedLoading(true);

    try {
      const order = await axios.post(
        `${URL}/user/buy-now/${product._id}`,
        {
          notes: additionalNotes,
          address: selectedAddress,
          paymentMode: selectedPayment,
          quantity,
        },
        config
      );

      // Updating user side
      // setOrderData(order.data.order);
      toast.success("Order Placed");
      setOrderPlacedLoading(false);
      // setConfirmationPage(true);
      dispatch(emptyBuyNowStore());
      navigateToOrderConfirmation(order.data.order);
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

  // Saving the order to db
  const saveOrder = async (response) => {
    setOrderPlacedLoading(true);

    try {
      // Make the first POST request to create the order
      const orderResponse = await axios.post(
        `${URL}/user/buy-now/${product._id}`,
        {
          notes: additionalNotes,
          address: selectedAddress,
          paymentMode: selectedPayment,
          quantity: 1,
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
      // setOrderData(order);
      toast.success("Order Placed");
      setOrderPlacedLoading(false);
      // setConfirmationPage(true);
      dispatch(emptyBuyNowStore());
      navigateToOrderConfirmation(order);
    } catch (error) {
      // Error Handling
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setOrderPlacedLoading(false);
    }
  };

  // Initiating razor pay payment method or window
  const initiateRazorPayPayment = async () => {
    // Getting razor-pay secret key
    const {
      data: { key },
    } = await axios.get(`${URL}/user/razor-key`, { withCredentials: true });

    // making razor-pay order
    const {
      data: { order },
    } = await axios.post(
      `${URL}/user/razor-order`,
      { amount: parseInt(finalTotal / 100) },
      config
    );

    // setting razor pay configurations
    let options = {
      key: key,
      amount: parseInt(finalTotal / 100),
      currency: "INR",
      name: "ex.iphones",
      description: "Test Transaction",
      image: `${URL}/off/logo.png`,
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
    if (!selectedAddress) {
      toast.error("Delivery address not found");
      return;
    }
    if (!selectedPayment) {
      toast.error("Please select a payment mode");
      return;
    }

    if (selectedPayment === "myWallet") {
      let entireTotal =
        Number(totalPrice) + Number(discount) + Number(tax) - Number(offer);
      if (walletBalance < entireTotal) {
        toast.error("Not balance in your wallet");
        return;
      }
    }

    if (selectedPayment === "razorPay") {
      initiateRazorPayPayment();
      return;
    }

    if (
      selectedPayment === "cashOnDelivery" ||
      selectedPayment === "myWallet"
    ) {
      saveOrderOnCashDeliveryOrMyWallet();
    }
  };

  return (
    <>
      {orderPlacedLoading ? (
        <Loading />
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
              <CheckoutPaymentOption
                handleSelectedPayment={handleSelectedPayment}
                selectedPayment={selectedPayment}
                walletBalance={walletBalance}
                setWalletBalance={setWalletBalance}
              />
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
              {product && <CheckoutCartRow item={{ product, quantity }} />}
            </div>
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

                {/*  {couponCode !== "" && (
                  <>
                    <div className="cart-total-li bg-blue-100 p-2 rounded">
                      <p className="cart-total-li-first">Coupon Applied</p>
                      <p className="cart-total-li-first">{couponCode}</p>
                    </div>
                    <div className="flex flex-row-reverse text-xs">
                      <button
                        className="text-red-500 hover:bg-red-100 p-1 rounded font-semibold"
                        // onClick={() => dispatch(removeCoupon())}
                      >
                        Remove Coupon
                      </button>
                    </div>
                  </>
                )} */}
              </div>
              <div className="cart-total-li">
                <p className="font-semibold text-gray-500">Total</p>
                <p className="font-semibold">{finalTotal}₹</p>
              </div>
            </>
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

export default BuyNow;
