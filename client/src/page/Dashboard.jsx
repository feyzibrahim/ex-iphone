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

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const priceParam = searchParams.get("price");
    const searchParam = searchParams.get("search");
    const sortParam = searchParams.get("sort");
    const page = searchParams.get("page");

    setCategory(categoryParam ? categoryParam.split(",") : []);
    setPrice(priceParam || "");
    setSort(sortParam || "");
    setPage(page || 1);
    setSearch(searchParam || "");
  }, []);

  const handleClick = (param, value) => {
    // let updatedFilters;
    const params = new URLSearchParams(window.location.search);

    if (value === "" || (param === "page" && value === 1)) {
      params.delete(param);
      if (param === "price") {
        setPrice("");
      }
      if (param === "sort") {
        setSort("");
        params.delete("page");
        setPage(1);
      }
    } else {
      if (param === "category" && value) {
        let cat = params.get("category");
        if (!cat) {
          params.append("category", value);
          setCategory([value]);
        } else {
          let temp = cat.split(",");
          if (temp.length > 0) {
            if (temp.includes(value)) {
              temp = temp.filter((item) => item !== value);
            } else {
              temp.push(value);
            }

            if (temp.length > 0) {
              params.set("category", temp.join(","));
              setCategory(temp);
            } else {
              params.delete("category");
              setCategory([]);
            }
          } else {
            params.delete("category");
            setCategory([]);
          }
        }
      } else {
        params.set(param, value);
        if (param === "price") {
          setPrice(value);
          params.delete("page");
          setPage(1);
        }
        if (param === "sort") {
          setSort(value);
          params.delete("page");
          setPage(1);
        }
        if (param === "search") {
          params.delete("page");
          setPage(1);
        }
      }
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

    setSearch("");
    setPrice("");
    setCategory([]);
    setPage(1);
  };

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getUserProducts(searchParams));

    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  return (
    <div className="w-full flex pt-20 px-5 lg:p-20 bg-gray-100 text-gray-500 font-semibold">
      {/* Category */}
      <FilterUserDashboard
        clearFilters={clearFilters}
        filters={category}
        handleClick={handleClick}
        price={price}
      />
      <div className="w-full lg:w-4/5 pb-5">
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
          <SearchBar
            handleClick={handleClick}
            search={search}
            setSearch={setSearch}
          />
          <SortButton handleClick={handleClick} sort={sort} />
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
