import React, { useEffect } from "react";
import {
  getWishlist,
  deleteOneProductFromWishlist,
  deleteEntireWishlist,
} from "../../../../../redux/actions/user/wishlistActions";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  // Function for deleting one product from the wishlist
  const dispatchDeleteFunction = (productId) => {
    dispatch(deleteOneProductFromWishlist(productId));
  };

  // Function for clearing the wishlist
  const clearWishlist = () => {
    dispatch(deleteEntireWishlist());
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg mx-5 lg:mx-0">
        <div className="flex justify-between items-center border-b px-5 ">
          <h1 className="uppercase text-lg font-semibold py-3 ">Wishlist</h1>
          <button
            onClick={clearWishlist}
            className="flex items-center bg-gray-100 px-2 py-1 rounded hover:bg-gray-300 gap-2"
          >
            Clear Wishlist <BiTrashAlt />
          </button>
        </div>

        <div className="p-5 overflow-auto">
          {wishlist ? (
            <table className="w-full min-w-max table-auto text-sm border">
              <thead>
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-5 py-3">Products</td>
                  <td className="px-5 py-3">Price</td>
                  <td className="px-5 py-3">Status</td>
                  <td className="px-5 py-3">Actions</td>
                </tr>
              </thead>
              <tbody>
                {wishlist &&
                  wishlist.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td
                          className="px-5 py-3 flex items-center hover:underline cursor-pointer hover:text-blue-500"
                          onClick={() =>
                            navigate(`/product/${item.product._id}`)
                          }
                        >
                          <div className="w-10 h-10 overflow-clip flex justify-center items-center">
                            {item.product.imageURL ? (
                              <img
                                src={`http://localhost:4000/img/${item.product.imageURL}`}
                                alt="img"
                                className="object-contain w-full h-full"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
                            )}
                          </div>
                          {item.product.name}
                        </td>
                        <td className="px-5 py-3">
                          ₹{item.product.price + item.product.markup}
                        </td>
                        <td className="px-5 py-3 capitalize">
                          {item.product.status === "published" && "available"}
                          {item.product.status === "draft" && "not available"}
                          {item.product.status === "unpublished" &&
                            "not available"}
                          {item.product.status === "low quantity" &&
                            "low quantity"}
                          {item.product.status === "out of stock" &&
                            "out of stock"}
                        </td>
                        <td className="px-5 py-3 text-xl">
                          <div className="flex items-center gap-3">
                            <FaCartPlus className="hover:text-gray-700 cursor-pointer" />
                            <BiTrashAlt
                              className="hover:text-gray-700 cursor-pointer"
                              onClick={() =>
                                dispatchDeleteFunction(item.product._id)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No Transactions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
