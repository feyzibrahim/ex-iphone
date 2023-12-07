import React from "react";
import { URL } from "../../../Common/api";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";

const OrderDetailsProductRow = ({
  length,
  index,
  item,
  status,
  toggleReviewModal,
}) => {
  const isLast = index === length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";
  return (
    <tr className={classes}>
      <td className="admin-table-row">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 overflow-clip flex justify-center items-center shrink-0">
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
            <Link to={`/product/${item.productId._id}`}>
              <p className="lg:text-lg font-semibold text-blue-600 line-clamp-1 hover:underline cursor-pointer">
                {item.productId.name}
              </p>
            </Link>
            <p className="line-clamp-2">{item.productId.description}</p>
          </div>
        </div>
      </td>
      <td className="admin-table-row">{item.price + item.markup}</td>
      <td className="admin-table-row">{item.quantity}</td>
      <td className="admin-table-row">
        {item.price + item.markup * item.quantity}
      </td>
      {status !== "pending" &&
        status !== "processing" &&
        status !== "shipped" && (
          <td>
            <p
              className="font-semibold flex items-center gap-1 text-blue-400 cursor-pointer hover:bg-blue-100 p-2 rounded-lg shrink-0"
              onClick={() => toggleReviewModal(item.productId)}
            >
              Leave a Review <BiMessageSquareDetail />
            </p>
          </td>
        )}
    </tr>
  );
};

export default OrderDetailsProductRow;
