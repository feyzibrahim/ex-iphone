import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/orders${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/user/cancel-order/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const requestReturn = createAsyncThunk(
  "order/requestReturn",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/user/request-return/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);
