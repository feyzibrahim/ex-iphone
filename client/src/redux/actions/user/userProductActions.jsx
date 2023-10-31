import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const handleError = (error, rejectWithValue) => {
  if (error.response && error.response.data.error) {
    console.log(error.response.data.error);

    return rejectWithValue(error.response.data.error);
  } else {
    return rejectWithValue(error.message);
  }
};

export const getUserProducts = createAsyncThunk(
  "products/getUserProducts",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/products`, config);
      return data.products;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);
