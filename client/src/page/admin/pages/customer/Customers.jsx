import React, { useEffect, useState } from "react";
import { BsCaretRightFill, BsFilterRight } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineCalendar } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCustomers,
  getFilteredData,
} from "../../../../redux/actions/admin/customerAction";
import TableRow from "./TableRow";
import ConfirmModal from "../../../../components/ConfirmModal";
import { deleteCustomer } from "../../../../redux/actions/admin/customerAction";
import BlockOrUnBlock from "./BlockOrUnBlock";
import Modal from "../../../../components/Modal";
import FilterArray from "../../Components/FilterArray";

const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customers, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const [deleteId, setDeleteId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = (id) => {
    setDeleteModal(!deleteModal);
    setDeleteId(id);
  };

  const dispatchDeleteAction = () => {
    dispatch(deleteCustomer(deleteId));
    toggleDeleteModal("");
  };

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);
  const toggleBlockUnBlockModal = (data) => {
    setBlockUnBlockModal(!blockUnBlockModal);
    setSelectedOrderToUpdate(data);
  };

  const dispatchFilter = (status) => {
    if (status === "all") {
      dispatch(getCustomers());
    } else {
      dispatch(getFilteredData(status === "active"));
    }
  };

  return (
    <>
      {deleteModal && (
        <ConfirmModal
          negativeAction={toggleDeleteModal}
          title="Confirm Delete?"
          positiveAction={dispatchDeleteAction}
        />
      )}
      {blockUnBlockModal && (
        <Modal
          tab={
            <BlockOrUnBlock
              toggleModal={toggleBlockUnBlockModal}
              data={selectedOrderToUpdate}
            />
          }
        />
      )}
      <div className="p-5 w-full overflow-y-auto">
        <div className="flex justify-between items-center text-xs font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Customers</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-blue-500 font-semibold">Dashboard</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Customer List</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="admin-button-fl bg-gray-200 text-blue-700">
              <FiDownload />
              Export
            </button>
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => navigate("addCustomer")}
            >
              <AiOutlinePlus />
              Create New Customer
            </button>
          </div>
        </div>
        <div className="lg:flex justify-between items-center text-xs font-semibold">
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
          {customers && (
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head">Name</th>
                  <th className="admin-table-head">Email</th>
                  <th className="admin-table-head">Phone No</th>
                  <th className="admin-table-head">Status</th>
                  <th className="admin-table-head">Joined</th>
                  <th className="admin-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => {
                  const isLast = index === customers.length - 1;

                  return (
                    <TableRow
                      isLast={isLast}
                      customer={customer}
                      key={index}
                      toggleDeleteModal={toggleDeleteModal}
                      toggleBlockUnBlockModal={toggleBlockUnBlockModal}
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

export default Customers;
