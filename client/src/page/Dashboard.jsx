import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/User/ProductCard";
import { getUserProducts } from "../redux/actions/user/userProductActions";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../redux/actions/user/wishlistActions";
import { useSearchParams } from "react-router-dom";
import SortButton from "../components/SortButton";
import Pagination from "../components/Pagination";
import FilterUserDashboard from "../components/FilterUserDashboard";
import JustLoading from "../components/JustLoading";

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
    const page = searchParams.get("page");

    setFilters({
      category: categoryParam ? categoryParam.split(",") : [],
      price: priceParam || "",
      search: searchParam || "",
      sort: sortParam || "",
    });
    setPage(page || 1);
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
    params.delete("sort");
    params.delete("page");

    setSearchParams(params);

    setFilters({
      category: [],
      price: "",
      search: "",
      sort: "",
    });
    setSearch("");
    setPage(1);
    // setActiveSort("Newest to Oldest");
  };

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getUserProducts(searchParams));
  }, [searchParams]);

  return (
    <div className="w-full flex pt-20 px-5 lg:p-20 bg-gray-100 text-gray-500 font-semibold">
      {/* Category */}
      <FilterUserDashboard
        clearFilters={clearFilters}
        filters={filters}
        handleClick={handleClick}
      />
      <div className="w-full lg:w-4/5 pb-5">
        <div className="flex  gap-5 items-center justify-between">
          <SearchBar
            handleClick={handleClick}
            search={search}
            setSearch={setSearch}
          />
          <SortButton handleClick={handleClick} filters={filters} />
          <div className="shrink-0 hidden lg:block">
            {userProducts.length}/{totalAvailableProducts} Results Loaded
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <JustLoading size={10} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
            {userProducts && userProducts.length > 0 ? (
              userProducts.map((pro, index) => (
                <ProductCard product={pro} key={index} />
              ))
            ) : (
              <div className="h-96">
                <p>Nothing to show</p>
              </div>
            )}
          </div>
        )}
        <Pagination
          handleClick={handleClick}
          number={4}
          page={page}
          totalNumber={totalAvailableProducts}
        />
      </div>
    </div>
  );
};

export default Dashboard;
