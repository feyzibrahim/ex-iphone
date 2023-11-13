import React, { useEffect, useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  deleteProducts,
  getProductsWithQuery,
} from "../../../../redux/actions/admin/productActions";
import TableRow from "./TableRow";
import ConfirmModal from "../../../../components/ConfirmModal";
import BreadCrumbs from "../../Components/BreadCrumbs";
import FilterArray from "../../Components/FilterArray";

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

  const handleQuerySearch = (status) => {
    if (status === "all") {
      dispatch(getProducts());
    } else {
      dispatch(getProductsWithQuery(status));
    }
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
            <BreadCrumbs list={["Dashboard", "Product List"]} />
          </div>
          <div className="flex gap-3">
            <button className="admin-button-fl bg-gray-200 text-blue-700">
              <FiDownload />
              Export
            </button>
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => navigate("add")}
            >
              <AiOutlinePlus />
              Add Product
            </button>
          </div>
        </div>
        <div className="lg:flex justify-between items-center text-xs font-semibold">
          <FilterArray
            list={[
              "all",
              "draft",
              "published",
              "out of stock",
              "low quantity",
              "unpublished",
            ]}
            handleClick={handleQuerySearch}
          />
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
        <div className="overflow-x-auto bg-white rounded-lg">
          {products && (
            <table className="w-full">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head w-3/12">Name</th>
                  <th className="admin-table-head w-3/12">Description</th>
                  <th className="admin-table-head w-1/12">Category</th>
                  <th className="admin-table-head w-1/12">Quantity</th>
                  <th className="admin-table-head w-1/12">Price</th>
                  <th className="admin-table-head w-1/12">Status</th>
                  <th className="admin-table-head w-1/12">Added</th>
                  <th className="admin-table-head w-1/12">Action</th>
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
