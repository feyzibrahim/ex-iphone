import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import {
  handleError,
  config,
  configMultiPart,
} from "../../../Common/configurations";

// Function to create new product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/admin/product`,
        formData,
        configMultiPart
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Function to get the product details
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (queries, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/products?${queries}`,
        config
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/admin/product/${id}`, config);

      return data.product;
    } catch (error) {
      return handleError(error, rejectWithValue);
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
        configMultiPart
      );

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
