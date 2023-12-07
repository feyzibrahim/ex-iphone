import { createSlice } from "@reduxjs/toolkit";
import {
  getCustomers,
  createNewCustomer,
  blockOrUnBlock,
} from "../../actions/admin/customerAction";
import toast from "react-hot-toast";

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    loading: false,
    customers: [],
    error: null,
    totalAvailableUsers: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.customers = payload.customers;
        state.totalAvailableUsers = payload.totalAvailableUsers;
      })
      .addCase(getCustomers.rejected, (state, { payload }) => {
        state.loading = false;
        state.customers = null;
        state.error = payload;
      })

      .addCase(createNewCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewCustomer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.customers = [...state.customers, payload];
      })
      .addCase(createNewCustomer.rejected, (state, { payload }) => {
        state.loading = false;
        state.customers = null;
        state.error = payload;
      })

      .addCase(blockOrUnBlock.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockOrUnBlock.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.customers.findIndex(
          (item) => item._id === payload.customer._id
        );

        if (index !== -1) {
          state.customers[index] = payload.customer;
        }
        toast.success("User Updated");
      })
      .addCase(blockOrUnBlock.rejected, (state, { payload }) => {
        state.loading = false;
        state.customers = null;
        state.error = payload;
      });
  },
});

export default customerSlice.reducer;
