import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/user/address`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (_, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/address`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    return commonReduxRequest(
      "delete",
      `/user/address/${id}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/user/address/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);
