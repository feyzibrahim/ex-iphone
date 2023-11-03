import React, { useEffect, useState } from "react";
import {
  getAddresses,
  deleteAddress,
} from "../../../redux/actions/user/addressActions";
import Address from "./Address";
import Modal from "../../../components/Modal";
import ConfirmModal from "../../../components/ConfirmModal";
import AddressEdit from "./AddressEdit";
import { useDispatch, useSelector } from "react-redux";
import AddressProfileRow from "./AddressProfileRow";

const AddressProfile = () => {
  const dispatch = useDispatch();

  const { addresses, loading, error } = useSelector((state) => state.address);

  // Fetching address when the page is loading
  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  // Selecting the first address as default when the address are loaded
  useEffect(() => {
    setCreateAddress(false);
    setEnableDeleteModal(false);
    setEditAddressModal(false);
  }, [addresses]);

  // Displaying address modal for creating address
  const [createAddress, setCreateAddress] = useState(false);
  const toggleAddress = () => {
    setCreateAddress(!createAddress);
  };

  // Enabling delete modal
  const [enableDeleteModal, setEnableDeleteModal] = useState(false);
  const toggleDeleteModal = (deleteAddressId) => {
    setEnableDeleteModal(!enableDeleteModal);
    setToBeDeletedId(deleteAddressId);
  };

  // Dispatching the delete function
  const [toBeDeletedId, setToBeDeletedId] = useState("");
  const dispatchDeleteAddress = () => {
    dispatch(deleteAddress(toBeDeletedId));
  };

  const [toBeEditedAddress, setToBeEditedAddress] = useState({});
  const [editAddressModal, setEditAddressModal] = useState(false);
  const toggleEditAddress = () => {
    setEditAddressModal(!editAddressModal);
  };

  return (
    <>
      {createAddress && <Modal tab={<Address closeToggle={toggleAddress} />} />}
      {editAddressModal && (
        <Modal
          tab={
            <AddressEdit
              closeToggle={toggleEditAddress}
              address={toBeEditedAddress}
            />
          }
        />
      )}
      {enableDeleteModal && (
        <ConfirmModal
          title="Confirm Delete?"
          negativeAction={toggleDeleteModal}
          positiveAction={dispatchDeleteAddress}
        />
      )}
      {/* Address listing */}
      <div className="bg-white p-5 rounded">
        {addresses.length > 0 ? (
          <>
            {addresses.map((item, index) => {
              return (
                <AddressProfileRow
                  item={item}
                  key={index}
                  setToBeEditedAddress={setToBeEditedAddress}
                  toggleDeleteModal={toggleDeleteModal}
                  toggleEditAddress={toggleEditAddress}
                />
              );
            })}
          </>
        ) : (
          <h1>No Saved address found</h1>
        )}
        <div className="my-5 text-white">
          <button className="btn-blue" onClick={toggleAddress}>
            Add a new Address
          </button>
        </div>
      </div>
    </>
  );
};

export default AddressProfile;
