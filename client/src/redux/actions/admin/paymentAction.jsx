import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

export const getPayments = createAsyncThunk(
  "payments/getPayments",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/payments${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
