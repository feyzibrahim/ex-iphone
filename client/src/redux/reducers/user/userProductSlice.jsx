import { createSlice } from "@reduxjs/toolkit";
import { getUserProducts } from "../../actions/user/userProductActions";

const userProductSlice = createSlice({
  name: "userProducts",
  initialState: {
    loading: false,
    userProducts: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userProducts = payload;
        console.log(payload);
      })
      .addCase(getUserProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.userProducts = null;
        state.error = payload;
      });
  },
});

export default userProductSlice.reducer;
