import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../../actions/user/cartActions";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cart: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.cart = payload;
        console.log(payload);
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.cart = null;
        state.error = payload;
      });
  },
});

export default cartSlice.reducer;
