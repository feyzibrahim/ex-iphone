import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/user/address`,
        formData,
        config
      );

      return data.address;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (nothing, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/address`, config);

      return data.addresses;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/user/address/${id}`, config);

      return data.address;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/user/address/${id}`,
        formData,
        config
      );

      console.log(data);
      return data.address;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
