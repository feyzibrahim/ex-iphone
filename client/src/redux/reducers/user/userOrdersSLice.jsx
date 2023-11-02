import { createSlice } from "@reduxjs/toolkit";
import { getOrders, cancelOrder } from "../../actions/user/userOrderActions";
import toast from "react-hot-toast";

const userOrdersSLice = createSlice({
  name: "userOrders",
  initialState: {
    loading: false,
    userOrders: [],
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
        state.userOrders = payload;
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
          (item) => item._id === payload._id
        );

        if (index !== -1) {
          state.userOrders[index] = payload;
        }
        toast.success("Order Cancelled Successfully");
      })
      .addCase(cancelOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.userOrders = null;
        state.error = payload;
      });
  },
});

export default userOrdersSLice.reducer;
