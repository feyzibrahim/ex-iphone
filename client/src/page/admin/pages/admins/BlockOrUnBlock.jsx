import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { blockOrUnBlock } from "../../../../redux/actions/superAdmin/adminAction";
import { useDispatch } from "react-redux";

const BlockOrUnBlock = ({ toggleModal, data }) => {
  const { id, status } = data;
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(
    status ? "active" : "blocked"
  );

  const handleSave = () => {
    if (selectedStatus === "") {
      return;
    }
    let isActive = selectedStatus === "active";

    dispatch(blockOrUnBlock({ id, isActive })).then(() => toggleModal());
  };

  return (
    <div className="w-2/6 bg-white p-5 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Block User</h1>
        <AiOutlineClose
          className="text-2xl cursor-pointer hover:text-gray-500"
          onClick={() => toggleModal("")}
        />
      </div>
      <div className="flex gap-3 items-center my-2">
        <p className="py-5 shrink-0">Choose a Status</p>
        <select
          name="status"
          id="status"
          className="capitalize px-5 py-2 w-full bg-gray-300 rounded-lg"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="active" className="capitalize">
            active
          </option>
          <option value="blocked" className="capitalize">
            blocked
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

export default BlockOrUnBlock;
