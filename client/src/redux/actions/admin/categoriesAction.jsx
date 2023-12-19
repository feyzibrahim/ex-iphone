import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/api";
import {
  handleError,
  config,
  configMultiPart,
} from "../../../Common/configurations";

// Function to Create new Category
export const createNewCategory = createAsyncThunk(
  "categories/createNewCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/admin/category`,
        formData,
        configMultiPart
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Function to fetch all categories
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (queries, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/categories?${queries}`,
        config
      );

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
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
        configMultiPart
      );
      return data.category;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${URL}/admin/category/${id}`,
        config
      );

      return data.category;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
