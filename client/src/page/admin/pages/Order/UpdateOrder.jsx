import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { updateOrderStatus } from "../../../../redux/actions/admin/ordersAction";
import { useDispatch, useSelector } from "react-redux";

const UpdateOrder = ({ toggleModal, data }) => {
  const { id, status } = data;
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(status);

  const { orders } = useSelector((state) => state.orders);

  const handleSave = () => {
    if (selectedStatus === "") {
      return;
    }
    dispatch(updateOrderStatus({ id, formData: { status: selectedStatus } }));
  };

  return (
    <div className="w-2/6 bg-white p-5 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Update Order</h1>
        <AiOutlineClose
          className="text-2xl cursor-pointer hover:text-gray-500"
          onClick={() => toggleModal({})}
        />
      </div>
      <div className="flex gap-3 items-center my-2">
        <p className="py-5">Status</p>
        <select
          name="status"
          id="status"
          className="capitalize px-5 py-2 w-full bg-gray-300 rounded-lg"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="pending" className="capitalize">
            pending
          </option>
          <option value="processing" className="capitalize">
            processing
          </option>
          <option value="shipped" className="capitalize">
            shipped
          </option>
          <option value="delivered" className="capitalize">
            delivered
          </option>
          <option value="cancelled" className="capitalize">
            cancelled
          </option>
          <option value="returned" className="capitalize">
            returned
          </option>
        </select>
      </div>
      <button
        className="btn-blue text-white uppercase w-full text-sm"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default UpdateOrder;
