import { createSlice } from "@reduxjs/toolkit";
import { getCart, deleteEntireCart } from "../../actions/user/cartActions";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cart: [],
    error: null,
    cartId: "",
  },
  reducers: {
    increment: (state, action) => {
      const { item } = action.payload;
      const updatedCart = state.cart.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      state.cart = updatedCart;
    },
    decrement: (state, action) => {
      const { item } = action.payload;
      const updatedCart = state.cart.map((cartItem) => {
        if (cartItem.quantity === 1) {
          return { ...cartItem };
        }
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          };
        }
        return cartItem;
      });
      state.cart = updatedCart;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.cart = payload.cart.items;
        state.cartId = payload.cart._id;
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.cart = null;
        state.error = payload;
      })
      .addCase(deleteEntireCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEntireCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.cart = [];
        toast.success("Cart Cleared");
      })
      .addCase(deleteEntireCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.cart = null;
        state.error = payload;
      });
  },
});

export const { increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
