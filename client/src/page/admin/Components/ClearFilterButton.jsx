import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const ClearFilterButton = ({ handleClick }) => {
  return (
    <button
      className="admin-button-fl bg-white hover:bg-gray-200 active:bg-gray-300"
      onClick={handleClick}
    >
      <AiOutlineDelete />
      Clear Filters
    </button>
  );
};

export default ClearFilterButton;
