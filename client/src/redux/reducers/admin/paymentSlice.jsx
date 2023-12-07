import { createSlice } from "@reduxjs/toolkit";
import { getPayments } from "../../actions/admin/paymentAction";

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    loading: false,
    payments: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPayments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.payments = payload.payments;
      })
      .addCase(getPayments.rejected, (state, { payload }) => {
        state.loading = false;
        state.payments = null;
        state.error = payload;
      });
  },
});

export default paymentsSlice.reducer;
