import { createSlice } from "@reduxjs/toolkit";
import {
  getOrders,
  cancelOrder,
  requestReturn,
} from "../../actions/user/userOrderActions";
import toast from "react-hot-toast";

const userOrdersSLice = createSlice({
  name: "userOrders",
  initialState: {
    loading: false,
    userOrders: [],
    error: null,
    totalAvailableOrders: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userOrders = payload.orders;
        state.totalAvailableOrders = payload.totalAvailableOrders;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.userOrders = null;
        state.error = payload;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        const index = state.userOrders.findIndex(
          (item) => item._id === payload.order._id
        );

        if (index !== -1) {
          state.userOrders[index] = payload.order;
        }
        toast.success("Order Cancelled Successfully");
      })
      .addCase(cancelOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.userOrders = null;
        state.error = payload;
      })
      .addCase(requestReturn.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestReturn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        const index = state.userOrders.findIndex(
          (item) => item._id === payload.order._id
        );

        if (index !== -1) {
          state.userOrders[index] = payload.order;
        }
        toast.success("Return Request Successfully Sent");
      })
      .addCase(requestReturn.rejected, (state, { payload }) => {
        state.loading = false;
        state.userOrders = null;
        state.error = payload;
      });
  },
});

export default userOrdersSLice.reducer;
