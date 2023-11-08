import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

export const getPayments = createAsyncThunk(
  "payments/getPayments",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/admin/payments`, config);

      return data.payments;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getFilteredData = createAsyncThunk(
  "payments/getFilteredData",
  async (isActive, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/payments?isActive=${isActive}`,
        config
      );

      return data.payments;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
