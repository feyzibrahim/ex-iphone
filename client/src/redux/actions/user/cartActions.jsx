import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

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

export const incrementCount = createAsyncThunk(
  "cart/incrementCount",
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/user/cart-increment-quantity/${cartId}/item/${productId}`
      );

      return data.updatedItem;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const decrementCount = createAsyncThunk(
  "cart/decrementCount",
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/user/cart-decrement-quantity/${cartId}/item/${productId}`
      );

      return data.updatedItem;
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
