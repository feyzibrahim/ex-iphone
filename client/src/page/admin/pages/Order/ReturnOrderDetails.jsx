import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { useParams } from "react-router-dom";
import axios from "axios";
import date from "date-and-time";

import { URL } from "../../../../Common/api";
import { FiDownload } from "react-icons/fi";
import { BiCalendar, BiHash } from "react-icons/bi";
import { FaRegCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import StatusComponent from "../../../../components/StatusComponent";

const ReturnOrderDetails = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL}/admin/order/${id}`, {
          withCredentials: true,
        });

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

  // Downloading invoice
  const handleGenerateInvoice = async () => {
    try {
      const response = await axios.get(`${URL}/admin/order-invoice/${id}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "invoice.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <div className="xy-center font-semibold">
        <div>
          <h1 className="font-bold text-2xl">Orders Details</h1>
          <BreadCrumbs list={["Dashboard", "Orders", "Order Details"]} />
        </div>
        <div className="flex">
          <button
            className="admin-button-fl bg-blue-700 hover:bg-blue-500 active:bg-blue-400 text-white"
            onClick={handleGenerateInvoice}
          >
            <FiDownload />
            Invoice
          </button>
        </div>
      </div>
      {orderData && (
        <>
          <div className="flex flex-col lg:flex-row gap-5 mt-5">
            <div className="tile">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold line-clamp-1">Order #</h1>
                <div>
                  <StatusComponent status={orderData.status} />
                </div>
              </div>
              <div className="xy-center">
                <div className="tile-row">
                  <div className="tile-row-icon">
                    <BiHash />
                  </div>
                  Order Id
                </div>
                <p>{orderData.orderId || orderData._id}</p>
              </div>
              <div className="xy-center">
                <div className="tile-row ">
                  <div className="tile-row-icon">
                    <BiCalendar />
                  </div>
                  Order Date
                </div>
                <p>
                  {date.format(new Date(orderData.createdAt), "MMM DD YYYY")}
                </p>
              </div>
              <div className="xy-center">
                <div className="tile-row">
                  <div className="tile-row-icon">
                    <FaRegCreditCard />
                  </div>
                  Payment Method
                </div>
                <p>{orderData.paymentMode}</p>
              </div>
            </div>
            <div className="tile">
              <div>
                <h1 className="text-lg font-bold">Customer</h1>
              </div>
              <div className="xy-center">
                <div className="tile-row ">
                  <div className="tile-row-icon">
                    <AiOutlineUser />
                  </div>
                  Customer
                </div>
                <p>
                  {orderData.address?.firstName} {orderData.address?.lastName}
                </p>
              </div>
              <div className="xy-center">
                <div className="tile-row">
                  <div className="tile-row-icon">
                    <HiOutlineMail />
                  </div>
                  Email
                </div>
                <p>{orderData.address?.email}</p>
              </div>
              <div className="xy-center">
                <div className="tile-row">
                  <div className="tile-row-icon">
                    <AiOutlinePhone />
                  </div>
                  Phone
                </div>
                <p>{orderData.address?.phoneNumber}</p>
              </div>
            </div>
            <div className="tile">
              <div>
                <h1 className="text-lg font-bold">Address</h1>
              </div>
              <div className="xy-center">
                <div className="tile-row">
                  <div className="tile-row-icon">
                    <FaMapMarkerAlt />
                  </div>
                  Shipping Address
                </div>
                <p>{orderData.address?.address}</p>
              </div>
              <div>
                <h1 className="text-lg font-bold mt-5">Delivery Date</h1>
              </div>
              <div className="xy-center">
                <div className="tile-row ">
                  <div className="tile-row-icon">
                    <BiCalendar />
                  </div>
                  Expected Date
                </div>
                <p>
                  {date.format(new Date(orderData.deliveryDate), "MMM DD YYYY")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="bg-white rounded-lg p-5 font-semibold mt-5 lg:w-2/3 overflow-x-scroll lg:overflow-hidden">
              <h1 className="text-lg font-bold">Order List</h1>
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr>
                    <td className="admin-table-head">No:</td>
                    <td className="admin-table-head w-64">Product</td>
                    <td className="admin-table-head">Quantity</td>
                    <td className="admin-table-head">Price</td>
                    <td className="admin-table-head">Total</td>
                  </tr>
                </thead>
                <tbody>
                  {orderData.products &&
                    orderData.products.map((item, index) => {
                      const isLast = index === orderData.products.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-gray-200 ";
                      return (
                        <tr
                          key={index}
                          className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
                        >
                          <td className="admin-table-row">{index + 1}</td>
                          <td className="admin-table-row">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 overflow-clip flex justify-center items-center shrink-0">
                                {item.productId.imageURL ? (
                                  <img
                                    src={`${URL}/img/${item.productId.imageURL}`}
                                    alt="img"
                                    className="object-contain w-full h-full"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
                                )}
                              </div>
                              <p className="line-clamp-2">
                                {item.productId.name}
                              </p>
                            </div>
                          </td>
                          <td className="admin-table-row">{item.quantity}</td>
                          <td className="admin-table-row">{item.price}</td>
                          <td className="admin-table-row">
                            {item.price * item.quantity}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-lg p-5 font-semibold mt-5 lg:w-1/3 ">
              <h1 className="text-lg font-bold">Order Summery</h1>
              <div className="border-b border-gray-200 pb-2 mb-2">
                <div className="cart-total-li">
                  <p className="cart-total-li-first">Sub Total</p>
                  <p className="cart-total-li-second">{orderData.subTotal}₹</p>
                </div>
                <div className="cart-total-li">
                  <p className="cart-total-li-first">Shipping</p>
                  <p className="cart-total-li-second">
                    {orderData.shipping === 0 ? "Free" : orderData.shipping}
                  </p>
                </div>
                <div className="cart-total-li">
                  <p className="cart-total-li-first">Discount</p>
                  <p className="cart-total-li-second">
                    {orderData.discount || 0}₹
                  </p>
                </div>
                <div className="cart-total-li">
                  <p className="cart-total-li-first">Tax</p>
                  <p className="cart-total-li-second">{orderData.tax || 0}₹</p>
                </div>
              </div>
              <div className="cart-total-li">
                <p className="font-semibold text-gray-500">Total</p>
                <p className="font-semibold">{orderData.totalPrice}₹</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReturnOrderDetails;
