import React, { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { useSelector, useDispatch } from "react-redux";
import date from "date-and-time";

import { getPayments } from "../../../../redux/actions/admin/paymentAction";
import { BsFilterRight } from "react-icons/bs";
import StatusComponent from "../../../../components/StatusComponent";
import FilterArray from "../../Components/FilterArray";
import SearchBar from "../../../../components/SearchBar";
import Pagination from "../../../../components/Pagination";
import RangeDatePicker from "../../../../components/RangeDatePicker";
import ClearFilterButton from "../../Components/ClearFilterButton";

const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { payments, loading, error, totalAvailablePayments } = useSelector(
    (state) => state.payments
  );

  // Filtering
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      if (type === "page") {
        setPage(1);
      }
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
  // Removing filters
  const removeFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("page");
    params.delete("status");
    params.delete("startingDate");
    params.delete("endingDate");
    setSearch("");
    setStartingDate("");
    setEndingDate("");
    setSearchParams(params);
  };

  useEffect(() => {
    dispatch(getPayments(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  return (
    <>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
          placeholder="Search with Payment Id"
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Payments</h1>
            <BreadCrumbs list={["Dashboard", "Payments"]} />
          </div>
          <div className="flex gap-3">
            <button className="admin-button-fl bg-gray-200 text-blue-700">
              <FiDownload />
              Export
            </button>
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => navigate("create")}
            >
              <AiOutlinePlus />
              Create Order
            </button>
          </div>
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={["all", "success", "pending", "cancelled", "refunded"]}
            handleClick={handleFilter}
          />
          <div className="flex my-2 gap-3">
            <RangeDatePicker
              handleFilter={handleFilter}
              startingDate={startingDate}
              setStartingDate={setStartingDate}
              endingDate={endingDate}
              setEndingDate={setEndingDate}
            />
            <ClearFilterButton handleClick={removeFilters} />
          </div>
        </div>
        {payments && payments.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head">No:</th>
                  <th className="admin-table-head">User name</th>
                  <th className="admin-table-head">Total Price</th>
                  <th className="admin-table-head">Date</th>
                  <th className="admin-table-head">Payment Mode</th>
                  <th className="admin-table-head w-80">Payment Id</th>
                  {/* <th className="admin-table-head">Order Id</th> */}
                  <th className="admin-table-head">Status</th>
                  {/* <th className="admin-table-head">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {payments.map((item, index) => {
                  const isLast = index === payments.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-200 ";
                  const adjustedIndex = (page - 1) * 10 + index + 1;
                  return (
                    <tr
                      key={index}
                      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
                      // onClick={() => navigate(`detail/${item._id}`)}
                    >
                      <td className="admin-table-row">{adjustedIndex}</td>
                      <td className="admin-table-row flex items-center gap-2">
                        <p className="line-clamp-1 mb-1 font-semibold">
                          {item.user.firstName} {item.user.lastName}
                        </p>
                      </td>
                      <td className="admin-table-row">
                        {item.order.totalPrice}₹
                      </td>
                      <td className="admin-table-row">
                        {date.format(new Date(item.createdAt), "MMM DD YYYY")}
                      </td>
                      <td className="admin-table-row">{item.paymentMode}</td>
                      <td className="admin-table-row">
                        <p className="line-clamp-1">{item.payment_id}</p>
                      </td>
                      {/* <td className="admin-table-row">
                        {item.order.orderId || item.order._id}
                      </td> */}
                      <td className="admin-table-row capitalize">
                        <StatusComponent status={item.status || ""} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/3 lg:left-1/2 lg:right-1/2">
            <p className="w-44">{error ? error : "No payments yet"}</p>
          </div>
        )}
        <div className="py-5">
          <Pagination
            handleClick={handleFilter}
            page={page}
            number={10}
            totalNumber={totalAvailablePayments}
          />
        </div>
      </div>
    </>
  );
};

export default Payments;
