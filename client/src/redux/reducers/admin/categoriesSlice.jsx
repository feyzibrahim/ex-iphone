import { createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  createNewCategory,
} from "../../actions/admin/categoriesAction";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    loading: false,
    categories: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.categories = payload;
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
      });
  },
});

export default categoriesSlice.reducer;
