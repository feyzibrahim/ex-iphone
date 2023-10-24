import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data", // this is the one when sending files
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

// Function to get the product details
export const productGetAll = createAsyncThunk(
  "products/productsGetAll",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/product",
        formData,
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);
