import React, { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";
import { URL } from "../../../../../Common/api";
import toast from "react-hot-toast";
import { config } from "../../../../../Common/configurations";
import { useNavigate } from "react-router-dom";
import { deleteOneProductFromWishlist } from "../../../../../redux/actions/user/wishlistActions";
import { useDispatch } from "react-redux";
import JustLoading from "../../../../../components/JustLoading";

const TableRow = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartLoading, setCartLoading] = useState(false);
  const addToCart = async (id) => {
    setCartLoading(true);
    await axios
      .post(
        `${URL}/user/cart`,
        {
          product: id,
          quantity: 1,
        },
        config
      )
      .then((data) => {
        toast.success("Added to cart");
        setCartLoading(false);
      })
      .catch((error) => {
        const err = error.response.data.error;
        toast.error(err);
        setCartLoading(false);
      });
  };

  // Function for deleting one product from the wishlist
  const dispatchDeleteFunction = (productId) => {
    dispatch(deleteOneProductFromWishlist(productId));
  };
  return (
    <tr>
      <td
        className="px-5 py-3 flex gap-3 items-center hover:underline cursor-pointer hover:text-blue-500 w-96"
        onClick={() => navigate(`/product/${item.product._id}`)}
      >
        <div className="w-10 h-10 overflow-clip flex justify-center items-center shrink-0">
          {item.product.imageURL ? (
            <img
              src={`${URL}/img/${item.product.imageURL}`}
              alt="img"
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
          )}
        </div>
        <p className="line-clamp-1">{item.product.name}</p>
      </td>
      <td className="px-5 py-3">₹{item.product.price + item.product.markup}</td>
      <td className="px-5 py-3 capitalize">
        {item.product.status === "published" && "available"}
        {item.product.status === "draft" && "not available"}
        {item.product.status === "unpublished" && "not available"}
        {item.product.status === "low quantity" && "low quantity"}
        {item.product.status === "out of stock" && "out of stock"}
      </td>
      <td className="px-5 py-3 text-xl">
        <div className="flex items-center gap-3">
          {cartLoading ? (
            <JustLoading size={5} />
          ) : (
            <FaCartPlus
              className="hover:text-gray-700 cursor-pointer"
              onClick={() => {
                addToCart(item.product._id);
              }}
            />
          )}
          <BiTrashAlt
            className="hover:text-gray-700 cursor-pointer"
            onClick={() => {
              dispatchDeleteFunction(item.product._id);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
