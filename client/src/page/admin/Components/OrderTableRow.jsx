import React from "react";
import date from "date-and-time";
import StatusComponent from "../../../components/StatusComponent";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { URL } from "@common/api";

const OrderTableRow = ({ item, index, toggleUpdateModal, classes }) => {
  const navigate = useNavigate();

  return (
    <tr
      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
      onClick={() =>
        navigate(`/admin/orders/detail/${item.orderId || item._id}`)
      }
    >
      <td className="admin-table-row">{index}</td>
      <td className="admin-table-row flex items-center gap-2">
        <div className="w-10 h-10 overflow-clip flex justify-center items-center  shrink-0">
          {item.products[0].productId.imageURL ? (
            <img
              src={`${URL}/img/${item.products[0].productId.imageURL}`}
              alt="img"
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
          )}
        </div>
        <div>
          <p className="line-clamp-1 mb-1 font-semibold">
            {item.products[0].productId.name}
          </p>
          <p className="font-semibold text-gray-500">
            {item.totalQuantity === 1
              ? item.totalQuantity + " Product"
              : "+" + (item.totalQuantity - 1) + " Products"}
          </p>
        </div>
      </td>
      <td className="admin-table-row">
        {date.format(new Date(item.createdAt), "MMM DD YYYY")}
      </td>
      <td className="admin-table-row">
        {item.user.firstName} {item.user.lastName}
      </td>
      <td className="admin-table-row">{item.totalPrice}₹</td>
      <td className="admin-table-row">
        {date.format(new Date(item.deliveryDate), "MMM DD YYYY")}
      </td>
      <td className="admin-table-row capitalize">
        <StatusComponent status={item.status} />
      </td>
      <td className="admin-table-row">
        <div className="flex items-center text-lg">
          <span
            className="hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              toggleUpdateModal({
                id: item._id,
                status: item.status,
                paymentMode: item.paymentMode,
                deliveryDate: item.createdAt,
              });
            }}
          >
            <AiOutlineEdit />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;
