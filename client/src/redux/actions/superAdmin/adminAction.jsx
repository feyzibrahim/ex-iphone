import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

// Function to Create new Admin
export const createNewAdmin = createAsyncThunk(
  "admins/createNewAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/super-admin/admin`,
        formData,
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getAdmins = createAsyncThunk(
  "admins/getAdmins",
  async (queries, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/super-admin/admins?${queries}`,
        config
      );
      return data.admins;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${URL}/super-admin/admin/${id}`,
        config
      );
      console.log(data);
      return data.admin;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const blockOrUnBlock = createAsyncThunk(
  "admins/blockOrUnBlock",
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/super-admin/admin-block-unblock/${id}`,
        { isActive },
        config
      );

      console.log(data);

      return data.admin;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
