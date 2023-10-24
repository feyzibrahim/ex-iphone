import React from "react";
import { BsCaretRightFill, BsFilterRight } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 w-full">
      <div className="flex justify-between items-center text-xs font-semibold">
        <div>
          <h1 className="font-bold text-2xl">Products</h1>
          <div className="flex items-center gap-2  mt-2 mb-4 text-gray-500">
            <p className="text-blue-500 font-semibold">Dashboard</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Product List</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="admin-button-fl bg-gray-200 text-blue-700">
            <FiDownload />
            Export
          </button>
          <button
            className="admin-button-fl bg-blue-700 text-white"
            onClick={() => navigate("addProducts")}
          >
            <AiOutlinePlus />
            Add Product
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs font-semibold">
        <div className="flex gap-2 font-semibold bg-white text-gray-500 my-2 p-1 shadow rounded-md">
          <p className="bg-gray-100 rounded px-2 py-1 text-blue-600 cursor-pointer">
            All products
          </p>
          <p className="admin-status">Published</p>
          <p className="admin-status">Low Stock</p>
          <p className="admin-status">Draft</p>
          <p className="admin-status">Out of Stocks</p>
        </div>
        <div className="flex gap-3">
          <button className="admin-button-fl bg-white">
            <AiOutlineCalendar />
            Select Date
          </button>
          <button className="admin-button-fl bg-white">
            <BsFilterRight />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
