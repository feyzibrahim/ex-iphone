import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import date from "date-and-time";
import StatusComponent from "../../../../components/StatusComponent";
import { useNavigate } from "react-router-dom";

const TableRow = ({ index, length, coupon }) => {
  const navigate = useNavigate();

  const isLast = index === length - 1;

  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";

  return (
    <tr
      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
    >
      <td className="admin-table-row">{index + 1}</td>
      <td className="admin-table-row">{coupon.code}</td>
      <td className="admin-table-row capitalize">{coupon.type}</td>
      <td className="admin-table-row">{coupon.value}</td>
      <td className="admin-table-row">
        <StatusComponent status={coupon.isActive ? "Active" : "Blocked"} />
      </td>
      <td className="admin-table-row">
        {coupon.createdAt
          ? date.format(new Date(coupon.createdAt), "MMM DD YYYY")
          : "No Data"}
      </td>
      <td className="admin-table-row">
        {coupon.expirationDate
          ? date.format(new Date(coupon.expirationDate), "MMM DD YYYY")
          : "No Data"}
      </td>
      <td className="admin-table-row">
        <div className="flex items-center gap-2 text-lg">
          <span
            className="hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`edit/${coupon._id}`);
            }}
          >
            <AiOutlineEdit />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
