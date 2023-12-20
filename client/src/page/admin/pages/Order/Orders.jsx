import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../../components/Modal";
import { getOrders } from "../../../../redux/actions/admin/ordersAction";
import UpdateOrder from "./UpdateOrder";
import FilterArray from "../../Components/FilterArray";
import ReturnRequestsButtonInOrders from "./ReturnRequestsButtonInOrders";
import ExportModal from "../../Components/ExportModal/ExportModal";
import OrderTableRow from "../../Components/OrderTableRow";
import JustLoading from "../../../../components/JustLoading";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../../../components/SearchBar";
import Pagination from "../../../../components/Pagination";
import RangeDatePicker from "../../../../components/RangeDatePicker";
import ClearFilterButton from "../../Components/ClearFilterButton";
import toast from "react-hot-toast";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error, totalAvailableOrders } = useSelector(
    (state) => state.orders
  );

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdateModal = (data) => {
    if (data.status === "cancelled") {
      toast.error("Cannot Edit Cancelled Product");
      return;
    }
    if (data.status === "returned") {
      toast.error("Cannot Edit Returned Product");
      return;
    }
    setUpdateModal(!updateModal);
    setSelectedOrderToUpdate(data);
  };

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

  // Filters setting initially
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, []);

  // Getting all the orders on page load
  useEffect(() => {
    dispatch(getOrders(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  // Export Modal
  const [showExportModal, setShowExportModal] = useState(false);
  const toggleExportModal = () => {
    setShowExportModal(!showExportModal);
  };

  return (
    <>
      {showExportModal && (
        <Modal tab={<ExportModal toggleExportModal={toggleExportModal} />} />
      )}
      {updateModal && (
        <Modal
          tab={
            <UpdateOrder
              toggleModal={toggleUpdateModal}
              data={selectedOrderToUpdate}
            />
          }
        />
      )}
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
          placeholder="Search Using Order Id..."
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Orders</h1>
            <BreadCrumbs list={["Dashboard", "Orders"]} />
          </div>
          <div className="flex gap-3">
            <button
              className="admin-button-fl bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-blue-700"
              onClick={toggleExportModal}
            >
              <FiDownload />
              Export
            </button>
            <ReturnRequestsButtonInOrders />
          </div>
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={[
              "all",
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
              "returned",
            ]}
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
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <JustLoading size={10} />
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head">No:</th>
                  <th className="admin-table-head w-64">Product</th>
                  <th className="admin-table-head">Order Date</th>
                  <th className="admin-table-head">Customer</th>
                  <th className="admin-table-head">Total</th>
                  <th className="admin-table-head">Delivery Date</th>
                  <th className="admin-table-head">Status</th>
                  <th className="admin-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => {
                  const isLast = index === orders.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-200 ";
                  const adjustedIndex = (page - 1) * 10 + index + 1;

                  return (
                    <OrderTableRow
                      key={index}
                      index={adjustedIndex}
                      item={item}
                      toggleUpdateModal={toggleUpdateModal}
                      classes={classes}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="py-5">
              <Pagination
                handleClick={handleFilter}
                page={page}
                number={10}
                totalNumber={totalAvailableOrders}
              />
            </div>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/3 lg:left-1/2 lg:right-1/2">
            <p className="w-44">{error ? error : "No orders are placed yet"}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
