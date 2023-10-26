import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
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

export const logout = createAsyncThunk(
  "user/logout",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/logout`, config);

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getUserDataFirst = createAsyncThunk(
  "user/getUserDataFirst",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/`, config);

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/user/login`,
        userCredentials,
        config
      );

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/user/signup`,
        userCredentials,
        config
      );

      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
