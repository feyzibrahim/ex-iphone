import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

// Function to Create new Coupon
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/admin/coupon`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/admin/coupons`, config);
      return data.coupons;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/admin/coupon/${id}`, config);
      return data.coupon;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const blockOrUnBlockCoupon = createAsyncThunk(
  "coupons/blockOrUnBlockCoupon",
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/admin/coupon-block-unblock/${id}`,
        { isActive },
        config
      );

      return data.coupon;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getFilteredCoupon = createAsyncThunk(
  "coupons/getFilteredCoupon",
  async (isActive, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/coupons?isActive=${isActive}`,
        config
      );

      return data.coupons;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
