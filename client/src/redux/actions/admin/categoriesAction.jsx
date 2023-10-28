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

// Function to Create new Category
export const createNewCategory = createAsyncThunk(
  "categories/createNewCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/admin/category`,
        formData,
        config
      );
      return data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

// Function to fetch all categories
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/admin/categories`, configJson);
      return data.categories;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

// Function to Update new Category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/admin/category/${id}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);
