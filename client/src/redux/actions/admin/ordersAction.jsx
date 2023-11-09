import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (nothing, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/admin/orders`, config);

      return data.orders;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/admin/order-status/${id}`,
        formData,
        config
      );

      return data.order;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getOrderWithQuery = createAsyncThunk(
  "orders/getOrderWithQuery",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/orders?status=${formData}`,
        config
      );

      return data.orders;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Return Order Actions

export const getReturnOrders = createAsyncThunk(
  "orders/getReturnOrders",
  async (nothing, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/admin/return-orders`, config);

      return data.orders;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getReturnOrderWithQuery = createAsyncThunk(
  "orders/getReturnOrderWithQuery",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/return-orders?status=${formData}`,
        config
      );

      return data.orders;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const updateReturnOrderStatus = createAsyncThunk(
  "orders/updateReturnOrderStatus",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/admin/return-order-status/${id}`,
        formData,
        config
      );

      return data.order;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
