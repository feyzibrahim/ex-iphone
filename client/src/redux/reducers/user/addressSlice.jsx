import { createSlice } from "@reduxjs/toolkit";
import {
  getAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
} from "../../actions/user/addressActions";
import toast from "react-hot-toast";

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    loading: false,
    addresses: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddresses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.addresses = payload.addresses;
      })
      .addCase(getAddresses.rejected, (state, { payload }) => {
        state.loading = false;
        state.addresses = null;
        state.error = payload;
      })
      // Address creation
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAddress.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.addresses = [...state.addresses, payload.address];
        toast.success("Address Added");
      })
      .addCase(createAddress.rejected, (state, { payload }) => {
        state.loading = false;
        state.addresses = null;
        state.error = payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.addresses = state.addresses.filter(
          (item) => item._id !== payload.address._id
        );
        toast.success("Address Deleted");
      })
      .addCase(deleteAddress.rejected, (state, { payload }) => {
        state.loading = false;
        state.addresses = null;
        state.error = payload;
      })
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.addresses.findIndex(
          (item) => item._id === payload.address._id
        );

        if (index !== -1) {
          state.addresses[index] = payload.address;
        }
      })
      .addCase(updateAddress.rejected, (state, { payload }) => {
        state.loading = false;
        state.addresses = null;
        state.error = payload;
      });
  },
});

export default addressSlice.reducer;
