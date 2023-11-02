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
      handleError(error, rejectWithValue);
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
      handleError(error, rejectWithValue);
    }
  }
);
