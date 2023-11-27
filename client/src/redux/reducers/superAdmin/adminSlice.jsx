import { createSlice } from "@reduxjs/toolkit";
import {
  getAdmins,
  createNewAdmin,
  deleteAdmin,
  blockOrUnBlock,
} from "../../actions/superAdmin/adminAction";
import toast from "react-hot-toast";

const adminSlice = createSlice({
  name: "admins",
  initialState: {
    loading: false,
    admins: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmins.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.admins = payload;
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
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.admins = state.admins.filter((item) => item._id !== payload._id);
        toast.success("Admin Deleted");
      })
      .addCase(deleteAdmin.rejected, (state, { payload }) => {
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
          (item) => item._id === payload._id
        );

        if (index !== -1) {
          state.admins[index] = payload;
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
