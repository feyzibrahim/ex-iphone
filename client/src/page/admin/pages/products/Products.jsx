import React, { useEffect, useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../../redux/actions/admin/productActions";
import TableRow from "./TableRow";
import BreadCrumbs from "../../Components/BreadCrumbs";
import FilterArray from "../../Components/FilterArray";
import JustLoading from "../../../../components/JustLoading";
import Pagination from "../../../../components/Pagination";
import SearchBar from "../../../../components/SearchBar";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error, totalAvailableProducts } = useSelector(
    (state) => state.products
  );

  // Filteration
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      params.delete(type);
    } else {
      params.set(type, value);
      if (type === "page") {
        setPage(value);
      }
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  // Getting page number on reload
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, []);

  // Getting products details
  useEffect(() => {
    dispatch(getProducts(searchParams));
  }, [searchParams]);

  return (
    <>
      <div className="p-5 w-full overflow-y-auto">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
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
            handleClick={handleFilter}
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
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <JustLoading size={10} />
            </div>
          ) : (
            products && (
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
                      />
                    );
                  })}
                </tbody>
              </table>
            )
          )}
          <div className="py-5">
            <Pagination
              handleClick={handleFilter}
              page={page}
              number={10}
              totalNumber={totalAvailableProducts}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
