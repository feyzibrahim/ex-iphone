import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import date from "date-and-time";
import StatusComponent from "../../../../components/StatusComponent";
import { URL } from "@common/api";
import ProfileImage from "../../../../components/ProfileImage";

const TableRow = ({ isLast, customer, toggleBlockUnBlockModal }) => {
  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";

  return (
    <tr
      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
    >
      <td className="admin-table-row flex items-center gap-2">
        <div className="w-10 h-10 overflow-clip flex justify-center items-center shrink-0">
          <ProfileImage user={customer} radius="md" />
        </div>
        <p className="line-clamp-1 w-52">
          {customer.firstName} {customer.lastName}
        </p>
      </td>
      <td className="admin-table-row">{customer.email}</td>
      <td className="admin-table-row">{customer.phoneNumber}</td>
      <td className="admin-table-row">
        <StatusComponent status={customer.isActive ? "Active" : "Blocked"} />
      </td>
      <td className="admin-table-row">
        {customer.createdAt
          ? date.format(new Date(customer.createdAt), "MMM DD YYYY")
          : "No Data"}
      </td>
      <td className="admin-table-row">
        <div className="flex items-center gap-2 text-lg">
          <span
            className="hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              toggleBlockUnBlockModal({
                id: customer._id,
                status: customer.isActive,
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

export default TableRow;
