import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

const SearchBar = ({ handleClick, search, setSearch }) => {
  const [showClose, setShowClose] = useState(false);
  return (
    <div className="w-full">
      <form
        className="flex items-center bg-white  py-2 px-4 rounded-lg border"
        onSubmit={(e) => {
          e.preventDefault();
          handleClick("search", search);
          handleClick("page", "");
          if (search === "") {
            setShowClose(false);
          } else {
            setShowClose(true);
          }
        }}
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
        {showClose ? (
          <button
            type="button"
            onClick={() => {
              handleClick("search", "");
              setShowClose(false);
              setSearch("");
            }}
          >
            <GrClose className="text-xl text-gray-400 hover:text-gray-800" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              handleClick("search", search);
              setShowClose(true);
            }}
          >
            <BiSearch className="text-xl text-gray-400 hover:text-gray-800" />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
