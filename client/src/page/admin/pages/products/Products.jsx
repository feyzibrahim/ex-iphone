import React, { useEffect, useState } from "react";
import { BsCaretRightFill, BsFilterRight } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  deleteProducts,
} from "../../../../redux/actions/admin/productActions";
import TableRow from "./TableRow";
import ConfirmModal from "../../../../components/ConfirmModal";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [enableConfirmDelete, setEnableConfirmDelete] = useState(false);

  const [idToBeDeleted, setIdToBeDeleted] = useState("");

  const toggleConfirmDelete = (id) => {
    setEnableConfirmDelete(!enableConfirmDelete);
    setIdToBeDeleted(id);
  };

  const deleteData = () => {
    dispatch(deleteProducts(idToBeDeleted));
    toggleConfirmDelete("");
  };

  return (
    <>
      {enableConfirmDelete && (
        <ConfirmModal
          title="Confirm Delete?"
          negativeAction={toggleConfirmDelete}
          positiveAction={deleteData}
        />
      )}
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
                  <th className="admin-table-head w-60">Description</th>
                  <th className="admin-table-head">Category</th>
                  <th className="admin-table-head">Quantity</th>
                  <th className="admin-table-head">Price</th>
                  <th className="admin-table-head">Status</th>
                  <th className="admin-table-head">Added</th>
                  <th className="admin-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <TableRow
                      index={index}
                      length={products.length}
                      product={product}
                      key={index}
                      toggleConfirmDelete={toggleConfirmDelete}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
