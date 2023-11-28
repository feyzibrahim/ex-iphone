import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import {
  config,
  configMultiPart,
  handleError,
} from "../../../Common/configurations";

// Function to Create new Customer
export const createNewCustomer = createAsyncThunk(
  "customers/createNewCustomer",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/admin/customer`,
        formData,
        configMultiPart
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async (queries, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/customers?${queries}`,
        config
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${URL}/admin/customer/${id}`,
        config
      );
      return data.customer;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const blockOrUnBlock = createAsyncThunk(
  "customers/blockOrUnBlock",
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/admin/customer-block-unblock/${id}`,
        { isActive },
        config
      );

      return data.customer;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
