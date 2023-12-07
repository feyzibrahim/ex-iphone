import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

// Function to Create new Admin
export const createNewAdmin = createAsyncThunk(
  "admins/createNewAdmin",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/super-admin/admin`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const getAdmins = createAsyncThunk(
  "admins/getAdmins",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/super-admin/admins${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const blockOrUnBlock = createAsyncThunk(
  "admins/blockOrUnBlock",
  async ({ id, isActive }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/super-admin/admin-block-unblock/${id}`,
      { isActive },
      appJson,
      rejectWithValue
    );
  }
);
