import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (nothing, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/orders`, config);

      return data.orders;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/user/cancel-order/${id}`,
        formData,
        config
      );

      return data.order;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
