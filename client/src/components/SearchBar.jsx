import React from "react";
import { BiSearch } from "react-icons/bi";
const SearchBar = () => {
  return (
    <div className="bg-white w-full py-2 px-5 rounded flex items-center">
      <input
        type="text"
        className="outline-none w-full"
        placeholder="Search..."
      />
      <BiSearch className="text-xl text-gray-600" />
    </div>
  );
};

export default SearchBar;
