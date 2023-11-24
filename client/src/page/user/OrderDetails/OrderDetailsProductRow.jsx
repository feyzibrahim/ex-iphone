import React from "react";
import { URL } from "../../../Common/links";

const OrderDetailsProductRow = ({ length, index, item }) => {
  const isLast = index === length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";
  return (
    <tr
      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
    >
      <td className="admin-table-row">
        <div className="flex items-center gap-5">
          <div className="w-14 h-1w-14 overflow-clip flex justify-center items-center shrink-0">
            {item.productId.imageURL ? (
              <img
                src={`${URL}/img/${item.productId.imageURL}`}
                alt="img"
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="w-14 h-1w-14 bg-slate-300 rounded-md"></div>
            )}
          </div>
          <div>
            <p className="lg:text-lg font-semibold text-blue-600 line-clamp-1">
              {item.productId.name}
            </p>
            <p className="line-clamp-2">{item.productId.description}</p>
          </div>
        </div>
      </td>
      <td className="admin-table-row">{item.price + item.markup}</td>
      <td className="admin-table-row">{item.quantity}</td>
      <td className="admin-table-row">
        {item.price + item.markup * item.quantity}
      </td>
    </tr>
  );
};

export default OrderDetailsProductRow;
