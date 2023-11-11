import React, { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import FilterArray from "../../Components/FilterArray";
import { BsFilterRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "./TableRow";
import {
  getCoupons,
  deleteCoupon,
  getFilteredCoupon,
} from "../../../../redux/actions/admin/couponsAction";
import ConfirmModel from "../../../../components/ConfirmModal";
import Loading from "../../../../components/Loading";

const Coupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { coupons, loading, error } = useSelector((state) => state.coupons);
  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState("");

  const toggleDeleteModel = (id) => {
    setIdToBeDeleted(id);
    setShowDeleteModel(!showDeleteModel);
  };

  const deleteData = () => {
    dispatch(deleteCoupon(idToBeDeleted));
    toggleDeleteModel("");
  };

  // Listing filtered data
  const dispatchFilter = (status) => {
    if (status === "all") {
      dispatch(getCoupons());
    } else {
      dispatch(getFilteredCoupon(status === "active"));
    }
  };

  if (!coupons) {
    if (loading) {
      return <Loading />;
    }
  }

  return (
    <>
      {showDeleteModel && (
        <ConfirmModel
          negativeAction={toggleDeleteModel}
          positiveAction={deleteData}
          title="Are your sure?"
        />
      )}
      <div className="p-5 w-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center text-sm font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Coupon</h1>
            <BreadCrumbs list={["Dashboard", "Coupon List"]} />
          </div>
          <div className="flex gap-3">
            {/* <button className="admin-button-fl bg-gray-200 text-blue-700">
            <FiDownload />
            Export
          </button> */}
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
        <div className="lg:flex justify-between items-center font-semibold text-sm">
          <FilterArray
            list={["all", "active", "blocked"]}
            handleClick={dispatchFilter}
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
                      toggleDeleteModal={toggleDeleteModel}
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

export default Coupon;
