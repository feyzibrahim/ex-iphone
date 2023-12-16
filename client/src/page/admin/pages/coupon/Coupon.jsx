import React, { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterArray from "../../Components/FilterArray";
import { BsFilterRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "./TableRow";
import { getCoupons } from "../../../../redux/actions/admin/couponsAction";
import Loading from "../../../../components/Loading";
import SearchBar from "../../../../components/SearchBar";
import RangeDatePicker from "../../../../components/RangeDatePicker";
import ClearFilterButton from "../../Components/ClearFilterButton";
import Pagination from "../../../../components/Pagination";

const Coupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { coupons, loading, error, totalAvailableCoupons } = useSelector(
    (state) => state.coupons
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
    dispatch(getCoupons(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  if (!coupons) {
    if (loading) {
      return <Loading />;
    }
  }

  return (
    <>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
        {/* Header */}
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Coupon</h1>
            <BreadCrumbs list={["Dashboard", "Coupon List"]} />
          </div>
          <div className="flex gap-3">
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => navigate("create")}
            >
              <AiOutlinePlus />
              Create New Coupon
            </button>
          </div>
        </div>
        {/* Filters */}
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={["all", "active", "blocked"]}
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
        <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
          {coupons && (
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head">No:</th>
                  <th className="admin-table-head">Code</th>
                  <th className="admin-table-head">Type</th>
                  <th className="admin-table-head">Value</th>
                  <th className="admin-table-head">Status</th>
                  <th className="admin-table-head">Created On</th>
                  <th className="admin-table-head">Expiry</th>
                  <th className="admin-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((item, index) => {
                  return (
                    <TableRow
                      coupon={item}
                      key={index}
                      index={index}
                      length={coupons.length}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="py-5">
          <Pagination
            handleClick={handleFilter}
            page={page}
            number={10}
            totalNumber={totalAvailableCoupons}
          />
        </div>
      </div>
    </>
  );
};

export default Coupon;
