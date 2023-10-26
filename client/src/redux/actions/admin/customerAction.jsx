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

// Function to Create new Customer
export const createNewCustomer = createAsyncThunk(
  "customers/createNewCustomer",
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

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/admin/customers`, configJson);
      return data.customers;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);
