import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import date from "date-and-time";
import { useNavigate } from "react-router-dom";

const TableRow = ({ index, length, product, toggleConfirmDelete }) => {
  const navigate = useNavigate();

  const isLast = index === length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";

  return (
    <tr
      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
    >
      <td className="admin-table-row flex items-center gap-2">
        <div className="w-10 h-10 overflow-clip flex justify-center items-center">
          {product.imageURL ? (
            <img
              src={`http://localhost:4000/img/${product.imageURL}`}
              alt="img"
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
          )}
        </div>

        {product.name}
      </td>
      <td className="admin-table-row">
        <div className="line-clamp-2">{product.description}</div>
      </td>
      <td className="admin-table-row">{product.category}</td>
      <td className="admin-table-row">{product.stockQuantity}</td>
      <td className="admin-table-row">{product.price}</td>
      <td className="admin-table-row capitalize">{product.status}</td>
      <td className="admin-table-row">
        {product.createdAt
          ? date.format(new Date(product.createdAt), "MMM DD YYYY")
          : "No Data"}
      </td>
      <td className="admin-table-row">
        <div className="flex items-center gap-2 text-lg">
          <span
            className="hover:text-gray-500"
            onClick={() => navigate(`edit/${product._id}`)}
          >
            <AiOutlineEdit />
          </span>
          <span
            className="hover:text-gray-500"
            onClick={() => toggleConfirmDelete(product._id)}
          >
            <AiOutlineDelete />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
