import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const URL = "http://localhost:4000";

const handleError = (error, rejectWithValue) => {
  if (error.response && error.response.data.error) {
    console.log(error.response.data.error);

    return rejectWithValue(error.response.data.error);
  } else {
    return rejectWithValue(error.message);
  }
};

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/cart`, config);

      return data.cart.items;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);
