import { createSlice } from "@reduxjs/toolkit";
import {
  getCoupons,
  createCoupon,
  deleteCoupon,
  getFilteredCoupon,
  editCoupon,
} from "../../actions/admin/couponsAction";
import toast from "react-hot-toast";

const couponsSlice = createSlice({
  name: "coupons",
  initialState: {
    loading: false,
    coupons: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoupons.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.coupons = payload;
      })
      .addCase(getCoupons.rejected, (state, { payload }) => {
        state.loading = false;
        state.coupons = null;
        state.error = payload;
      })
      .addCase(getFilteredCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilteredCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.coupons = payload;
      })
      .addCase(getFilteredCoupon.rejected, (state, { payload }) => {
        state.loading = false;
        state.coupons = null;
        state.error = payload;
        toast.error(payload);
      })
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.coupons = [...state.coupons, payload];
      })
      .addCase(createCoupon.rejected, (state, { payload }) => {
        state.loading = false;
        state.coupons = null;
        state.error = payload;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.coupons = state.coupons.filter(
          (item) => item._id !== payload._id
        );
        toast.success("Coupon Deleted");
      })
      .addCase(deleteCoupon.rejected, (state, { payload }) => {
        state.loading = false;
        state.coupons = null;
        state.error = payload;
      })

      .addCase(editCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.coupons.findIndex(
          (item) => item._id === payload._id
        );

        if (index !== -1) {
          state.coupons[index] = payload;
        }
      })
      .addCase(editCoupon.rejected, (state, { payload }) => {
        state.loading = false;
        state.coupons = null;
        state.error = payload;
      });
  },
});

export default couponsSlice.reducer;
