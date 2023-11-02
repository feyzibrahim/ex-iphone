import React, { useEffect, useState } from "react";
import { TiCancel } from "react-icons/ti";
import axios from "axios";
import { URL } from "../../Common/links";
import { useParams } from "react-router-dom";
import date from "date-and-time";
import OrderDetailsProductRow from "./components/OrderDetailsProductRow";
import Modal from "../../components/Modal";
import OrderCancellation from "./components/OrderCancellation";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL}/user/order/${id}`);

        if (res) {
          setOrderData(res.data.order);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    loadInitialData();
  }, []);

  const [cancelModal, setCancelModal] = useState(false);
  const toggleCancelModal = () => {
    setCancelModal(!cancelModal);
  };

  return (
    <>
      {cancelModal && (
        <Modal
          tab={<OrderCancellation closeToggle={toggleCancelModal} id={id} />}
        />
      )}
      <div className="min-h-screen pt-20 px-5 lg:pt-20 lg:px-40 bg-gray-100 py-10 ">
        <div className="bg-white rounded-lg overflow-x-auto">
          <div className="flex items-center justify-between p-5 border-b">
            <h1 className="uppercase text-xl font-semibold">Order Detail</h1>
            <p
              className="text-lg font-semibold flex items-center gap-1 text-red-400 cursor-pointer hover:bg-red-100 px-2 rounded-lg"
              onClick={toggleCancelModal}
            >
              Cancel Order <TiCancel className="text-gray-200xl" />
            </p>
          </div>
          <div>
            <div className="p-5 m-5 bg-gray-200 rounded-lg flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold">#{orderData._id}</h1>
                <p className="text-gray-500">
                  {orderData.totalQuantity} products ∙ Order placed in{" "}
                  {date.format(
                    new Date(orderData.createdAt),
                    "MMM DD, YYYY at hh:mm A"
                  )}
                </p>
              </div>
              <h1 className="text-3xl font-bold">{orderData.totalPrice}₹</h1>
            </div>
            <p className="px-5 pb-5 border-b">
              <span className="text-gray-500">Order expected arrival </span>
              {date.format(new Date(orderData.deliveryDate), "MMM DD, YYYY")}
            </p>
            <div className="p-5 w-full border-b">
              <h1 className="text-lg font-semibold pb-3">
                Products{" "}
                <span className="text-gray-500">
                  ({orderData.totalQuantity})
                </span>
              </h1>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 border border-gray-300">
                    <td className="px-5 py-2 w-3/6">Products</td>
                    <td className="px-5 py-2 w-1/6">Price</td>
                    <td className="px-5 py-2 w-1/6">Quantity</td>
                    <td className="px-5 py-2 w-1/6">Sub-Total</td>
                  </tr>
                </thead>
                <tbody>
                  {orderData.products &&
                    orderData.products.map((item, index) => (
                      <OrderDetailsProductRow
                        index={index}
                        item={item}
                        length={orderData.products.length}
                        key={index}
                      />
                    ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 font-semibold lg:flex justify-center">
              <div className="border-b lg:border-b-0 lg:border-r p-5 lg:w-1/3">
                <h1 className="text-xl">Shipping Address</h1>
                <p className="pt-5 pb-2">
                  {orderData.address?.firstName} {orderData.address?.lastName}{" "}
                </p>
                <p className="text-gray-500">
                  {orderData.address?.address}, {orderData.address?.country},{" "}
                  {orderData.address?.regionState}, {orderData.address?.city},
                  Pin Code: {orderData.address?.pinCode}
                </p>
                <p className="py-2">
                  Phone Number:{" "}
                  <span className="text-gray-500">
                    {orderData.address?.phoneNumber}
                  </span>
                </p>
                <p className="py-2">
                  Email:{" "}
                  <span className="text-gray-500">
                    {orderData.address?.email || "Email is not provided"}
                  </span>
                </p>
              </div>
              <div className="border-b lg:border-b-0 lg:border-r p-5 lg:w-1/3">
                <h1 className="text-xl">Billing Address</h1>
                <p className="pt-5 pb-2">
                  {orderData.address?.firstName} {orderData.address?.lastName}{" "}
                </p>
                <p className="text-gray-500">
                  {orderData.address?.address}, {orderData.address?.country},{" "}
                  {orderData.address?.regionState}, {orderData.address?.city},
                  Pin Code: {orderData.address?.pinCode}
                </p>
                <p className="py-2">
                  Phone Number:{" "}
                  <span className="text-gray-500">
                    {orderData.address?.phoneNumber}
                  </span>
                </p>
                <p className="py-2">
                  Email:{" "}
                  <span className="text-gray-500">
                    {orderData.address?.email || "Email is not provided"}
                  </span>
                </p>
              </div>
              <div className="p-5 lg:w-1/3">
                <h1>Order Notes</h1>
                <p className="text-gray-500 py-2">
                  {orderData.additionalNotes || "Not Added"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
