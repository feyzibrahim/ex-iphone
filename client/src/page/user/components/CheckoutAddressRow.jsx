import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CheckoutAddressRow = ({
  item,
  selectedAddress,
  setSelectedAddress,
  setToBeEditedAddress,
  toggleDeleteModal,
  toggleEditAddress,
}) => {
  const selected = selectedAddress === item._id;

  return (
    <div
      className={`border rounded my-1 py-2 px-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
        selected && "border-blue-400 border-2"
      }`}
      onClick={() => {
        setSelectedAddress(item._id);
      }}
    >
      <p className="line-clamp-1">
        <span className="mr-2">
          <input
            type="radio"
            name="chosen"
            id="chosen"
            checked={selected}
            onChange={() => {
              setSelectedAddress(item._id);
            }}
          />
        </span>
        <span className="font-semibold">
          {item.firstName} {item.lastName},
        </span>{" "}
        {item.address}
      </p>
      <div className="flex gap-3">
        <AiOutlineEdit
          className="hover:text-gray-500"
          onClick={() => {
            setToBeEditedAddress(item);
            toggleEditAddress();
          }}
        />
        <AiOutlineDelete
          onClick={() => toggleDeleteModal(item._id)}
          className="hover:text-gray-500"
        />
      </div>
    </div>
  );
};

export default CheckoutAddressRow;
