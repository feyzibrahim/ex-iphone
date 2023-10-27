import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/User/ProductCard";
import { getUserProducts } from "../redux/actions/user/userProductActions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const { userProducts, loading, error } = useSelector(
    (state) => state.userProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProducts());
  }, []);

  return (
    <div className="w-full flex pt-20 px-5 lg:p-20 bg-gray-100 text-gray-500 font-semibold">
      {/* Category */}
      <div className="lg:w-1/5">
        <ul className="hidden lg:block">
          <li className="uppercase">Category</li>
          <li className="category-li">
            <input type="radio" name="category" /> iPhone
          </li>
          <li className="category-li">
            <input type="radio" name="category" /> iMac
          </li>
          <li className="category-li">
            <input type="radio" name="category" /> Macbook
          </li>
          <li className="uppercase">Price Range</li>
          <li className="category-li">
            <input type="radio" name="priceRange" /> All Price
          </li>
          <li className="category-li">
            <input type="radio" name="priceRange" /> Under 10000₹
          </li>
          <li className="category-li">
            <input type="radio" name="priceRange" /> 10000₹ - 20000₹
          </li>
          <li className="category-li">
            <input type="radio" name="priceRange" /> 20000₹ - 30000₹
          </li>
          <li className="category-li">
            <input type="radio" name="priceRange" /> 30000₹ - 40000₹
          </li>
          <li className="category-li">
            <input type="radio" name="priceRange" /> 40000₹ - 50000₹
          </li>
          <li className="category-li">
            <input type="radio" name="priceRange" /> Above 50000₹{" "}
          </li>
        </ul>
      </div>
      <div className="w-full lg:w-4/5">
        <div className="flex  gap-5 items-center justify-between">
          <SearchBar />
          <div className="shrink-0 border border-gray-300 py-2 px-3 rounded-lg">
            Sort By: Popular
          </div>
          <div className="shrink-0 hidden lg:block">40/4000 Results Loaded</div>
        </div>
        <div className="flex flex-wrap -mx-2  mt-5">
          {userProducts &&
            userProducts.map((pro, index) => (
              <div
                key={index}
                className="w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 px-2 mb-4"
              >
                <ProductCard product={pro} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
