import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (rc, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/wishlist`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const deleteEntireWishlist = createAsyncThunk(
  "wishlist/deleteEntireWishlist",
  async (_, { rejectWithValue }) => {
    return commonReduxRequest(
      "delete",
      `/user/wishlist-clear`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

export const deleteOneProductFromWishlist = createAsyncThunk(
  "wishlist/deleteOneProductFromWishlist",
  async (productId, { rejectWithValue }) => {
    return commonReduxRequest(
      "delete",
      `/user/wishlist-delete-item/${productId}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/user/wishlist`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);
