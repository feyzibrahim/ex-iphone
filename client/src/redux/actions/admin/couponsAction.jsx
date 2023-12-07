import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

// Function to Create new Coupon
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/admin/coupon`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

// Editing the existing coupon
export const editCoupon = createAsyncThunk(
  "coupons/editCoupon",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/admin/coupon/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/coupons${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
