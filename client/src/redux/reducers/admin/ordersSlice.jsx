import { createSlice } from "@reduxjs/toolkit";
import {
  getOrders,
  updateOrderStatus,
  getOrderWithQuery,
  getReturnOrders,
  updateReturnOrderStatus,
} from "../../actions/admin/ordersAction";
import toast from "react-hot-toast";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.orders = payload;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.orders = null;
        state.error = payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.orders.findIndex(
          (item) => item._id === payload._id
        );
        if (index !== -1) {
          state.orders[index] = payload;
        }
        toast.success("Product Status Updated");
      })
      .addCase(updateOrderStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.orders = null;
        state.error = payload;
      })

      .addCase(updateReturnOrderStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.orders = null;
        state.error = payload;
      })
      .addCase(getOrderWithQuery.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderWithQuery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.orders = payload;
      })
      .addCase(getOrderWithQuery.rejected, (state, { payload }) => {
        state.loading = false;
        state.orders = null;
        state.error = payload;
        toast.error(payload);
      })

      // Return Order Getting list

      .addCase(getReturnOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReturnOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.orders = payload;
      })
      .addCase(getReturnOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.orders = null;
        state.error = payload;
      })
      .addCase(updateReturnOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReturnOrderStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.orders.findIndex(
          (item) => item._id === payload._id
        );
        if (index !== -1) {
          state.orders[index] = payload;
        }
        toast.success("Product Status Updated");
      });
  },
});

export default ordersSlice.reducer;
