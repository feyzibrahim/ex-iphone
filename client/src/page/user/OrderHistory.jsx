import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/user/userOrderActions";
import date from "date-and-time";
import { Link, useSearchParams } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import StatusComponent from "../../components/StatusComponent";
import JustLoading from "../../components/JustLoading";
import Pagination from "../../components/Pagination";

const OrderHistory = () => {
  const { userOrders, loading, error, totalAvailableOrders } = useSelector(
    (state) => state.userOrders
  );
  const dispatch = useDispatch();

  // Pagination
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      params.delete(type);
    } else {
      if (type === "page" && value === 1) {
        params.delete(type);
        setPage(1);
      } else {
        params.set(type, value);
        if (type === "page") {
          setPage(value);
        }
      }
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  useEffect(() => {
    dispatch(getOrders(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNum = params.get("page");
    setPage(parseInt(pageNum) || 1);
  }, [searchParams]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg h-full mx-5 lg:mx-0">
        <h1 className="uppercase text-lg font-semibold px-5 py-3 border-b">
          Order History
        </h1>
        <div className="p-5 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <JustLoading size={10} />
            </div>
          ) : userOrders && userOrders.length > 0 ? (
            <table className="w-full min-w-max table-auto text-sm border">
              <thead>
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-5 py-2">Product Name</td>
                  <td className="px-5 py-2">Status</td>
                  <td className="px-5 py-2">Date</td>
                  <td className="px-5 py-2">Total</td>
                  <td className="px-5 py-2">Action</td>
                </tr>
              </thead>
              <tbody>
                {userOrders &&
                  userOrders.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-5 py-2 font-semibold flex items-center">
                          <p className="w-60 line-clamp-1">
                            {item.products[0].productId.name}{" "}
                          </p>
                          <p className="text-gray-500 font-normal">
                            ({item.totalQuantity}) products
                          </p>
                        </td>
                        <td className="px-5 py-2">
                          <StatusComponent status={item.status} />
                        </td>
                        <td className="px-5 py-2">
                          {date.format(new Date(item.createdAt), "MMM DD YYYY")}
                        </td>
                        <td className="px-5 py-2">{item.totalPrice}₹</td>
                        <td className="px-5 py-2 hover:underline hover:text-blue-600 text-blue-400 ">
                          <Link
                            to={`detail/${item.orderId || item._id}`}
                            className="flex items-center gap-2"
                          >
                            View Details <BsArrowRight />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center">No Orders yet</div>
          )}
        </div>
        <div className="py-5">
          <Pagination
            handleClick={handleFilter}
            number={10}
            page={page}
            totalNumber={totalAvailableOrders}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
