import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/api";
import { config, handleError } from "../../../Common/configurations";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/wishlist`, config);

      return data.wishlist.items;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const deleteEntireWishlist = createAsyncThunk(
  "wishlist/deleteEntireWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${URL}/user/wishlist-clear/`,
        config
      );

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const deleteOneProductFromWishlist = createAsyncThunk(
  "wishlist/deleteOneProductFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${URL}/user/wishlist-delete-item/${productId}`,
        config
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/user/wishlist`,
        formData,
        config
      );

      console.log(data);

      return data.wishlist.items;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
