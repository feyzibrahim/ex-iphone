import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

export const getUserProducts = createAsyncThunk(
  "products/getUserProducts",
  async (searchParams, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/products?${searchParams}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
