import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { URL } from "../Common/links";
import { config } from "../Common/configurations";

const FilterUserDashboard = ({ filters, handleClick, clearFilters }) => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const { data } = await axios.get(`${URL}/user/categories`, config);
    setCategories(data.categories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="lg:w-1/5">
      <ul className="hidden lg:block">
        <li className="uppercase">Category</li>

        {categories.map((item) => {
          return (
            <li className="category-li">
              <input
                type="checkbox"
                name="category"
                value={item._id}
                checked={filters.category.includes(item._id)}
                onChange={() => handleClick("category", item._id)}
              />{" "}
              {item.name}
            </li>
          );
        })}

        <li className="uppercase">Price Range</li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value=""
            checked={filters.price === ""}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          All Price
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="Under 25000"
            checked={filters.price === "Under 25000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          Under 25000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="25000-50000"
            checked={filters.price === "25000-50000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          25000₹ - 50000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="50000-100000"
            checked={filters.price === "50000-100000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          50000₹ - 100000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="100000-150000"
            checked={filters.price === "100000-150000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          100000₹ - 150000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="200000-300000"
            checked={filters.price === "200000-300000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          200000₹ - 300000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="Above 300000"
            checked={filters.price === "Above 300000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          Above 300000₹{" "}
        </li>
        <li>
          <button
            onClick={clearFilters}
            className=" bg-blue-100 hover:bg-red-200 active:bg-red-300 outline-none px-5 py-2 rounded font-semibold flex items-center gap-2"
          >
            <BiTrash />
            <p className="text-xs">Clear All filters</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterUserDashboard;
