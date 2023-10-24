import { createSlice } from "@reduxjs/toolkit";
import { productGetAll } from "../../actions/admin/productActions";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(productGetAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(productGetAll.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(productGetAll.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      });
  },
});

export default productSlice.reducer;
