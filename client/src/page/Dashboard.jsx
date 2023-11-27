import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/User/ProductCard";
import { getUserProducts } from "../redux/actions/user/userProductActions";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../redux/actions/user/wishlistActions";
import { useSearchParams } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import SortButton from "../components/SortButton";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const { userProducts, loading, error, totalAvailableProducts } = useSelector(
    (state) => state.userProducts
  );
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: [],
    price: "",
    search: "",
    sort: "",
  });

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const priceParam = searchParams.get("price");
    const searchParam = searchParams.get("search");
    const sortParam = searchParams.get("sort");

    setFilters({
      category: categoryParam ? categoryParam.split(",") : [],
      price: priceParam || "",
      search: searchParam || "",
      sort: sortParam || "",
    });
    setSearch(searchParam || "");
  }, []);

  const [page, setPage] = useState(1);
  const handleClick = (param, value) => {
    let updatedFilters;

    if (param === "category") {
      const newCategories = filters.category.includes(value)
        ? filters.category.filter((item) => item !== value)
        : [...filters.category, value];

      updatedFilters = { ...filters, category: newCategories };
    } else {
      updatedFilters = { ...filters, [param]: value };
    }

    setFilters(updatedFilters);

    const params = new URLSearchParams();

    if (updatedFilters.category.length > 0) {
      params.append("category", updatedFilters.category.join(","));
    }

    if (updatedFilters.price) {
      params.append("price", updatedFilters.price);
    }
    if (updatedFilters.search) {
      params.append("search", updatedFilters.search);
    }
    if (updatedFilters.sort) {
      params.append("sort", updatedFilters.sort);
    }
    if (updatedFilters.page) {
      params.append("page", updatedFilters.page);
      setPage(updatedFilters.page);
    }

    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  // Clear all filters
  const clearFilters = () => {
    const params = new URLSearchParams();

    params.delete("category");
    params.delete("price");
    params.delete("search");

    setSearchParams(params);

    setFilters({
      category: [],
      price: "",
      search: "",
    });
    setSearch("");
  };

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getUserProducts(searchParams));
  }, [searchParams]);

  return (
    <div className="w-full flex pt-20 px-5 lg:p-20 bg-gray-100 text-gray-500 font-semibold">
      {/* Category */}
      <div className="lg:w-1/5">
        <ul className="hidden lg:block">
          <li className="uppercase">Category</li>
          <li className="category-li">
            <input
              type="checkbox"
              name="category"
              value="iPhone"
              checked={filters.category.includes("653cd76485d84b451a7729f2")}
              onChange={() =>
                handleClick("category", "653cd76485d84b451a7729f2")
              }
            />{" "}
            iPhone
          </li>
          <li className="category-li">
            <input
              type="checkbox"
              name="category"
              value="iMac"
              checked={filters.category.includes("65454ccb36cb81ada69f65ed")}
              onChange={() =>
                handleClick("category", "65454ccb36cb81ada69f65ed")
              }
            />{" "}
            iMac
          </li>
          <li className="category-li">
            <input
              type="checkbox"
              name="category"
              value="macbook"
              checked={filters.category.includes("65454c3436cb81ada69f65e7")}
              onChange={() =>
                handleClick("category", "65454c3436cb81ada69f65e7")
              }
            />{" "}
            Macbook
          </li>
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
      <div className="w-full lg:w-4/5">
        <div className="flex  gap-5 items-center justify-between">
          <SearchBar
            handleClick={handleClick}
            search={search}
            setSearch={setSearch}
          />
          <SortButton handleClick={handleClick} />
          <div className="shrink-0 hidden lg:block">
            {userProducts.length}/{totalAvailableProducts} Results Loaded
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
          {userProducts &&
            userProducts.map((pro, index) => (
              <ProductCard product={pro} key={index} />
            ))}
        </div>
        <Pagination
          handleClick={handleClick}
          number={userProducts.length}
          page={page}
          totalNumber={totalAvailableProducts}
        />
      </div>
    </div>
  );
};

export default Dashboard;
