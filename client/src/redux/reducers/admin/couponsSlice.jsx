import { createSlice } from "@reduxjs/toolkit";
import {
  getCoupons,
  createCoupon,
  editCoupon,
} from "../../actions/admin/couponsAction";

const couponsSlice = createSlice({
  name: "coupons",
  initialState: {
    loading: false,
    coupons: [],
    error: null,
    totalAvailableCoupons: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoupons.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.coupons = payload.coupons;
      })
      .addCase(getCoupons.rejected, (state, { payload }) => {
        state.loading = false;
        state.coupons = null;
        state.error = payload;
      })

      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.coupons = [...state.coupons, payload];
        state.totalAvailableCoupons = payload.totalAvailableCoupons;
      })
      .addCase(createCoupon.rejected, (state, { payload }) => {
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
