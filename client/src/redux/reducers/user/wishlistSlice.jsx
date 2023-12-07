import { createSlice } from "@reduxjs/toolkit";
import {
  getWishlist,
  deleteEntireWishlist,
  deleteOneProductFromWishlist,
  addToWishlist,
} from "../../actions/user/wishlistActions";
import toast from "react-hot-toast";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    loading: false,
    wishlist: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishlist = payload.wishlist.items;
        state.error = null;
      })
      .addCase(getWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.wishlist = [];
        state.error = payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishlist = payload.wishlist.items;
        state.error = null;
        toast.success("Added to wishlist");
      })
      .addCase(addToWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.wishlist = [];
        state.error = payload;
        toast.error(payload);
      })
      .addCase(deleteEntireWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEntireWishlist.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.wishlist = [];
        toast.success("WishList Cleared");
      })
      .addCase(deleteEntireWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.wishlist = [];
        state.error = payload;
      })
      .addCase(deleteOneProductFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOneProductFromWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        const { productId } = payload;

        state.wishlist = state.wishlist.filter((item) => {
          return item.product._id !== productId;
        });

        toast.success("Item Deleted");
      })
      .addCase(deleteOneProductFromWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.wishlist = [];
        state.error = payload;
      });
  },
});

export const { checkProductIsInWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
