import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/links";
import { config, handleError } from "../../../Common/configurations";

export const getUserProducts = createAsyncThunk(
  "products/getUserProducts",
  async (searchParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/user/products?${searchParams}`,
        config
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
