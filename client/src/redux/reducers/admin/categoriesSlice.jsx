import { createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  createNewCategory,
  deleteCategory,
  updateCategory,
} from "../../actions/admin/categoriesAction";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    loading: false,
    categories: [],
    error: null,
    totalAvailableCategories: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.categories = payload.categories;
        state.totalAvailableCategories = payload.totalAvailableCategories;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.categories = null;
        state.error = payload;
      })
      .addCase(createNewCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.categories = [...state.categories, payload];
      })
      .addCase(createNewCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.categories = null;
        state.error = payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.categories = state.categories.filter(
          (category) => category._id !== payload._id
        );
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.categories = null;
        state.error = payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.categories.findIndex(
          (product) => product._id === payload._id
        );

        if (index !== -1) {
          state.categories[index] = payload;
        }
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.categories = null;
        state.error = payload;
      });
  },
});

export default categoriesSlice.reducer;
