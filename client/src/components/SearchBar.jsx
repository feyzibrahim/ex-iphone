import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
const SearchBar = ({ handleClick, search, setSearch }) => {
  return (
    <div className="bg-white w-full py-2 px-5 rounded">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick("search", search);
        }}
        className="flex items-center"
      >
        <input
          type="text"
          className="outline-none w-full"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="submit">
          <BiSearch className="text-xl text-gray-600 hover:text-gray-400 cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
