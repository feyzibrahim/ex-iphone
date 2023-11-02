import { createSlice } from "@reduxjs/toolkit";
import { getOrders, updateOrderStatus } from "../../actions/admin/ordersAction";
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
      });
  },
});

export default ordersSlice.reducer;
