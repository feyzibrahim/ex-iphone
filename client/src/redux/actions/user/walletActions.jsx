import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/api";
import { config, handleError } from "../../../Common/configurations";

export const getWallet = createAsyncThunk(
  "wallet/getWallet",
  async (rc, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/wallet`, config);

      return data.wallet;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
