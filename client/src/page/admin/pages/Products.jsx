import React, { useEffect } from "react";
import { BsCaretRightFill, BsFilterRight } from "react-icons/bs";
import {
  AiOutlinePlus,
  AiOutlineCalendar,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../redux/actions/admin/productActions";
import date from "date-and-time";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="p-5 w-full overflow-y-auto">
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
      <div className="lg:flex justify-between items-center text-xs font-semibold">
        <div className="flex justify-between gap-2 font-semibold bg-white text-gray-500 my-2 p-1 shadow rounded-md">
          <p className="bg-gray-100 rounded px-2 py-1 text-blue-600 cursor-pointer">
            All products
          </p>
          <p className="admin-status">Published</p>
          <p className="admin-status">Low Stock</p>
          <p className="admin-status">Draft</p>
          <p className="admin-status">Out of Stocks</p>
        </div>
        <div className="flex my-2 gap-3">
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
      <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
        {products && (
          <table className="w-full min-w-max table-auto ">
            <thead className="font-normal">
              <tr className="border-b border-gray-200">
                <th className="admin-table-head">Name</th>
                <th className="admin-table-head">Description</th>
                <th className="admin-table-head">Category</th>
                <th className="admin-table-head">Quantity</th>
                <th className="admin-table-head">Price</th>
                <th className="admin-table-head">Status</th>
                <th className="admin-table-head">Added</th>
                <th className="admin-table-head">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((pro, index) => {
                const isLast = index === products.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-gray-200 ";

                return (
                  <tr
                    key={index}
                    className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
                  >
                    <td className="admin-table-row flex items-center gap-2">
                      <div className="w-10 h-10 overflow-clip flex justify-center items-center">
                        <img
                          src={`http://localhost:4000/img/${pro.imageURL}`}
                          alt="img"
                          className="object-contain w-full h-full"
                        />
                      </div>

                      {pro.name}
                    </td>
                    <td className="admin-table-row">{pro.description}</td>
                    <td className="admin-table-row">{pro.category}</td>
                    <td className="admin-table-row">{pro.stockQuantity}</td>
                    <td className="admin-table-row">{pro.price}</td>
                    <td className="admin-table-row capitalize">{pro.status}</td>
                    <td className="admin-table-row">
                      {pro.createdAt
                        ? date.format(new Date(pro.createdAt), "MMM DD YYYY")
                        : "No Data"}
                    </td>
                    <td className="admin-table-row">
                      <div className="flex items-center gap-2 text-lg">
                        <span className="hover:text-gray-500">
                          <AiOutlineEdit />
                        </span>
                        <span className="hover:text-gray-500">
                          <AiOutlineDelete />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
