import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/api";
import { config, handleError } from "../../../Common/configurations";

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/user/review`, formData, config);

      return data.review;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/user/order-review/${id}`,
        config
      );

      return data.reviews;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// export const deleteReview = createAsyncThunk(
//   "reviews/deleteReview",
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.delete(`${URL}/user/reviews/${id}`, config);

//       return data.reviews;
//     } catch (error) {
//       return handleError(error, rejectWithValue);
//     }
//   }
// );

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/user/review/${id}`,
        formData,
        config
      );

      return data.review;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
