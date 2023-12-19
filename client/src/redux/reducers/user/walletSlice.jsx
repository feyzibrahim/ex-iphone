import { createSlice } from "@reduxjs/toolkit";
import { getWallet } from "../../actions/user/walletActions";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    loading: false,
    wallet: {},
    error: null,
    totalAvailableWalletTransactions: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWallet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.wallet = payload.wallet;
        state.totalAvailableWalletTransactions =
          payload.totalAvailableWalletTransactions;
      })
      .addCase(getWallet.rejected, (state, { payload }) => {
        state.loading = false;
        state.wallet = null;
        state.error = payload;
      });
  },
});

export default walletSlice.reducer;
