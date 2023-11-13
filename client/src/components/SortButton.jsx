import React from "react";

const SortButton = ({ handleClick }) => {
  const handleChange = (sort, value) => {
    handleClick(sort, value);
  };

  return (
    <div className={`shrink-0 flex gap-2 items-center`}>
      <p className="shrink-0"> Sort By:</p>
      <select
        className="rounded-lg outline-none px-2 py-1 border-"
        onChange={(e) => {
          if (e.target.value === "Oldest to newest") {
            handleChange("sort", "created-desc");
          }
          if (e.target.value === "Price Low to High") {
            handleChange("sort", "price-asc");
          }
          if (e.target.value === "Price High to Low") {
            handleChange("sort", "price-desc");
          }
          if (e.target.value === "Newest to Oldest") {
            handleChange("sort", "");
          }
        }}
      >
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="Newest to Oldest"
        >
          Newest to Oldest
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="Oldest to newest"
        >
          Oldest to newest
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="Price Low to High"
        >
          Price Low to High
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="Price High to Low"
        >
          Price High to Low
        </option>
      </select>
    </div>
  );
};

export default SortButton;
