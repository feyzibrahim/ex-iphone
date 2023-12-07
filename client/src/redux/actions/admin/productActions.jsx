import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson, multiForm } from "@common/configurations";

// Function to create new product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/admin/product`,
      formData,
      multiForm,
      rejectWithValue
    );
  }
);

// Function to get the product details
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/products${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/admin/product/${id}`,
      formData,
      multiForm,
      rejectWithValue
    );
  }
);
