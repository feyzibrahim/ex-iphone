import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../Common/links";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Address from "./components/Address";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import {
  getAddresses,
  deleteAddress,
} from "../../redux/actions/user/addressActions";
import ConfirmModal from "../../components/ConfirmModal";
import AddressEdit from "./components/AddressEdit";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cart from Redux
  const { cart, loading, error, cartId, totalPrice, shipping, discount, tax } =
    useSelector((state) => state.cart);

  // Address from Redux
  const {
    addresses,
    loading: addressLoading,
    error: addressError,
  } = useSelector((state) => state.address);

  // If there is no item in the cart navigate to cart
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart]);

  const [selectedAddress, setSelectedAddress] = useState("");

  // Fetching address when the page is loading
  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  // Selecting the first address as default when the address are loaded
  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]._id);
    }
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
      <div className="pt-20 px-5 lg:p-20 lg:flex items-start gap-5 bg-gray-100">
        {/* Address form */}
        <div className="lg:w-3/4">
          <>
            <h1 className="my-1 font-semibold text-lg">Choose below address</h1>
            <div className="bg-white p-5 rounded">
              {addresses.length > 0 ? (
                <>
                  <h2 className="my-1 font-semibold ">Your addresses</h2>
                  {addresses.map((item, index) => {
                    const selected = selectedAddress === item._id;
                    return (
                      // Address Row
                      <div
                        key={index}
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
          <p className="my-1 font-semibold">Additional Notes</p>
          <textarea
            placeholder="Notes about your order e.g. special notes for delivery"
            className="w-full h-40 px-3 py-2 outline-none rounded"
          ></textarea>
        </div>

        {/* Order Summery Session */}

        <div className="lg:w-1/4 bg-white px-5 py-3 border border-gray-200 rounded shrink-0">
          <h1 className="font-semibold py-2">Order Summery</h1>
          <div className="py-1">
            {cart &&
              cart.map((item, index) => (
                // Cart row
                <div className="flex gap-2 items-center mb-3" key={index}>
                  <div className="w-9 h-9 shrink-0">
                    <img
                      src={`${URL}/img/${item.product.imageURL}`}
                      alt="im"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.quantity} x{" "}
                      <span className="font-semibold text-blue-500">
                        {item.product.price}₹
                      </span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="border-b border-gray-200 pb-2 mb-2">
            <div className="cart-total-li">
              <p className="cart-total-li-first">Sub Total</p>
              <p className="cart-total-li-second">{totalPrice}₹</p>
            </div>
            <div className="cart-total-li">
              <p className="cart-total-li-first">Shipping</p>
              <p className="cart-total-li-second">
                {shipping === 0 ? "Free" : shipping}
              </p>
            </div>
            <div className="cart-total-li">
              <p className="cart-total-li-first">Discount</p>
              <p className="cart-total-li-second">{discount}₹</p>
            </div>
            <div className="cart-total-li">
              <p className="cart-total-li-first">Tax</p>
              <p className="cart-total-li-second">{tax}₹</p>
            </div>
          </div>
          <div className="cart-total-li">
            <p className="font-semibold text-gray-500">Total</p>
            <p className="font-semibold">
              {totalPrice + discount + tax + shipping}₹
            </p>
          </div>
          <button
            className="btn-blue w-full text-white uppercase font-semibold text-sm my-5"
            onClick={() => {}}
          >
            Place order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
