import React, { useState } from "react";

const FilterArray = ({ list, handleClick }) => {
  const [activeStatusFilter, setActiveStatusFilter] = useState(list[0]);

  return (
    <div className="flex justify-between gap-2 font-semibold bg-white text-gray-500 my-2 p-1 shadow rounded-md text-sm">
      {list.map((status) => (
        <p
          key={status}
          className={
            activeStatusFilter === status
              ? "bg-gray-100 rounded px-2 py-1 text-blue-600 cursor-pointer"
              : "admin-status"
          }
          onClick={() => {
            setActiveStatusFilter(status);
            handleClick(status);
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      ))}
    </div>
  );
};

export default FilterArray;
