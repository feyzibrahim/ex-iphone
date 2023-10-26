import { createSlice } from "@reduxjs/toolkit";
import {
  getCustomers,
  createNewCustomer,
} from "../../actions/admin/customerAction";

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    loading: false,
    customers: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.customers = payload;
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
      });
  },
});

export default customerSlice.reducer;
