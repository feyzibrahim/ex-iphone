import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

export const getOrders = createAsyncThunk(
  "address/getOrders",
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
  "address/updateOrderStatus",
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
  "address/getOrderWithQuery",
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
