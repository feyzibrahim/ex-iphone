import { createSlice } from "@reduxjs/toolkit";
import {
  getOrders,
  updateOrderStatus,
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
        state.orders = payload.orders;
        state.totalAvailableOrders = payload.totalAvailableOrders;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.orders = null;
        state.error = payload;
      })
      // .addCase(updateOrderStatus.pending, (state) => {
      //   state.loading = false;
      // })
      .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.orders.findIndex(
          (item) => item._id === payload.order._id
        );
        if (index !== -1) {
          state.orders[index] = payload.order;
        }
        toast.success("Product Status Updated");
      })
      .addCase(updateOrderStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.orders = null;
        state.error = payload;
      })

      // Return Order Getting list
      .addCase(getReturnOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReturnOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.orders = payload.orders;
      })
      .addCase(getReturnOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.orders = null;
        state.error = payload;
      })
      // .addCase(updateReturnOrderStatus.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(updateReturnOrderStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.orders.findIndex(
          (item) => item._id === payload.order._id
        );
        if (index !== -1) {
          state.orders[index] = payload.order;
        }
        toast.success("Product Status Updated");
      })
      .addCase(updateReturnOrderStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.orders = null;
        state.error = payload;
      });
  },
});

export default ordersSlice.reducer;
