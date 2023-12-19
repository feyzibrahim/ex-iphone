import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  getUserDataFirst,
  signUpUser,
  logout,
  editUserProfile,
  googleLoginOrSignUp,
} from "../actions/userActions";
import toast from "react-hot-toast";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    updateUserOnOTPValidation: (state, { payload }) => {
      state.user = payload;
    },
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Logout States
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      // Get User data when user comes back later to website after closing the browser.
      .addCase(getUserDataFirst.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDataFirst.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(getUserDataFirst.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })

      // Login States
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })
      // Google Login
      .addCase(googleLoginOrSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLoginOrSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(googleLoginOrSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      // Sign-up States
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })
      // Editing User Profile
      .addCase(editUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
        toast.success("Profile Updated");
      })
      .addCase(editUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      });
  },
});

export const { updateUserOnOTPValidation, updateError } = userSlice.actions;
export default userSlice.reducer;
