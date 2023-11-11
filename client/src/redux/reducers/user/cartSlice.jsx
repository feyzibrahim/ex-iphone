import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  deleteEntireCart,
  deleteOneProduct,
  decrementCount,
  incrementCount,
} from "../../actions/user/cartActions";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cart: [],
    error: null,
    cartId: "",
    totalPrice: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
  },
  reducers: {
    calculateTotalPrice: (state) => {
      let sum = state.cart.reduce(
        (total, item) =>
          total + (item.product.price + item.product.markup) * item.quantity,
        0
      );
      state.totalPrice = sum;
      state.tax = sum * 0.08;
    },
    clearCartOnOrderPlaced: (state) => {
      state.loading = false;
      state.error = null;
      state.cart = [];
      state.cartId = "";
      state.totalPrice = 0;
      state.discount = 0;
      state.shipping = 0;
      state.tax = 0;
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
        state.cart = payload.cart?.items || [];
        state.cartId = payload.cart?._id || "";
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
      })
      .addCase(deleteOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOneProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        const { productId } = payload;

        state.cart = state.cart.filter((item) => {
          return item.product._id !== productId;
        });

        toast.success("Item Deleted");
      })
      .addCase(deleteOneProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.cart = null;
        state.error = payload;
      })

      // Updating cart on when quantity is increased

      .addCase(incrementCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(incrementCount.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const updatedCart = state.cart.map((cartItem) => {
          console.log(cartItem.product._id, payload.product);
          if (cartItem.product._id === payload.product) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        state.cart = updatedCart;
      })
      .addCase(incrementCount.rejected, (state, { payload }) => {
        state.loading = false;
        // state.cart = null;
        state.error = payload;
        toast.error(payload);
      })
      .addCase(decrementCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(decrementCount.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const updatedCart = state.cart.map((cartItem) => {
          console.log(cartItem.product._id, payload.product);
          if (cartItem.product._id === payload.product) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        });
        state.cart = updatedCart;
      })
      .addCase(decrementCount.rejected, (state, { payload }) => {
        state.loading = false;
        // state.cart = null;
        state.error = payload;
        toast.error(payload);
      });
  },
});

export const { calculateTotalPrice, clearCartOnOrderPlaced } =
  cartSlice.actions;
export default cartSlice.reducer;
