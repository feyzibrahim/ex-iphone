import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

const configJson = {
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

// Function to create new product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/admin/product`,
        formData,
        config
      );
      return data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

// Function to get the product details
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/admin/products`, configJson);
      return data.products;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${URL}/admin/product/${id}`,
        configJson
      );

      return data.product;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/admin/product/${id}`,
        formData,
        config
      );

      return data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);
