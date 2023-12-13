import { createSlice } from "@reduxjs/toolkit";
import {
  getAdmins,
  createNewAdmin,
  blockOrUnBlock,
} from "../../actions/superAdmin/adminAction";
import toast from "react-hot-toast";

const adminSlice = createSlice({
  name: "admins",
  initialState: {
    loading: false,
    admins: [],
    error: null,
    totalAvailableAdmins: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmins.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.admins = payload.admins;
        state.totalAvailableAdmins = payload.totalAvailableAdmins;
      })
      .addCase(getAdmins.rejected, (state, { payload }) => {
        state.loading = false;
        state.admins = null;
        state.error = payload;
      })

      .addCase(createNewAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.admins = [...state.admins, payload];
        toast.success("Admin Created");
      })
      .addCase(createNewAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.admins = null;
        state.error = payload;
      })
      .addCase(blockOrUnBlock.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockOrUnBlock.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.admins.findIndex(
          (item) => item._id === payload.admin._id
        );

        if (index !== -1) {
          state.admins[index] = payload.admin;
        }
        toast.success("Admin status Updated");
      })
      .addCase(blockOrUnBlock.rejected, (state, { payload }) => {
        state.loading = false;
        state.admins = null;
        state.error = payload;
      });
  },
});

export default adminSlice.reducer;
