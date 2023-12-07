import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

export const getWallet = createAsyncThunk(
  "wallet/getWallet",
  async (_, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/wallet`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
