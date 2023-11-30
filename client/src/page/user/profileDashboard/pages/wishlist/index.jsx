import React, { useEffect } from "react";
import {
  getWishlist,
  deleteEntireWishlist,
} from "../../../../../redux/actions/user/wishlistActions";
import { useDispatch, useSelector } from "react-redux";
import { BiTrashAlt } from "react-icons/bi";
import TableRow from "./TableRow";
import JustLoading from "../../../../../components/JustLoading";
const WishList = () => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  // Function for clearing the wishlist
  const clearWishlist = () => {
    dispatch(deleteEntireWishlist());
  };

  // Adding to cart

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
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <JustLoading size={10} />
            </div>
          ) : wishlist && wishlist.length > 0 ? (
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
                  wishlist.map((item, index) => (
                    <TableRow item={item} key={index} />
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>You haven't added any products to wishlist</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
