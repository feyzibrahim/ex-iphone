import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import date from "date-and-time";
import StatusComponent from "../../../../components/StatusComponent";

const TableRow = ({ isLast, admin, toggleBlockUnBlockModal }) => {
  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";

  return (
    <tr
      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
    >
      <td className="admin-table-row flex items-center gap-2">
        <div className="w-10 h-10 overflow-clip flex justify-center items-center">
          {admin.profileImgURL ? (
            <img
              src={`http://localhost:4000/img/${admin.profileImgURL}`}
              alt="img"
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
          )}
        </div>
        {admin.firstName} {admin.lastName}
      </td>
      <td className="admin-table-row">{admin.email}</td>
      <td className="admin-table-row">{admin.phoneNumber}</td>
      <td className="admin-table-row">
        <StatusComponent status={admin.isActive ? "Active" : "Blocked"} />
      </td>
      <td className="admin-table-row">
        {admin.createdAt
          ? date.format(new Date(admin.createdAt), "MMM DD YYYY")
          : "No Data"}
      </td>
      <td className="admin-table-row">
        <div className="flex items-center gap-2 text-lg">
          <span
            className="hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              toggleBlockUnBlockModal({
                id: admin._id,
                status: admin.isActive,
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
