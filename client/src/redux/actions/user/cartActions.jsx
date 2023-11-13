import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

// Fetching whole cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/cart`, config);

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Deleting whole cart
export const deleteEntireCart = createAsyncThunk(
  "cart/deleteEntireCart",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/user/cart/${id}`, config);

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Deleting one item from the cart
export const deleteOneProduct = createAsyncThunk(
  "cart/deleteOneProduct",
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${URL}/user/cart/${cartId}/item/${productId}`,
        config
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Incrementing the count of one product
export const incrementCount = createAsyncThunk(
  "cart/incrementCount",
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/user/cart-increment-quantity/${cartId}/item/${productId}`,
        config
      );

      return data.updatedItem;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Decrementing the count of one product
export const decrementCount = createAsyncThunk(
  "cart/decrementCount",
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/user/cart-decrement-quantity/${cartId}/item/${productId}`,
        config
      );

      return data.updatedItem;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Applying coupon to cart
export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (couponCode, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/user/coupon-apply`,
        { code: couponCode },
        config
      );

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Removing existing coupon of a cart

export const removeCoupon = createAsyncThunk(
  "cart/removeCoupon",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/coupon-remove`, config);

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`${URL}/user/cart`, formData, config);
//       console.log(data);
//       return data;
//     } catch (error) {
//      return handleError(error, rejectWithValue);
//     }
//   }
// );
