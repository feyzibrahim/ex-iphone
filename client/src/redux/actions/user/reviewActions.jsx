import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/user/review`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (id, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/order-review/${id}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/user/review/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);
