import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  createProduct,
  deleteProducts,
  updateProduct,
  getProductsWithQuery,
} from "../../actions/admin/productActions";
import toast from "react-hot-toast";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Getting Product details
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.products = payload;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.products = null;
        state.error = payload;
      })
      // After applying queries
      .addCase(getProductsWithQuery.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsWithQuery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.products = payload;
      })
      .addCase(getProductsWithQuery.rejected, (state, { payload }) => {
        state.loading = false;
        state.products = null;
        state.error = payload;
        toast.error(payload);
      })

      // Creating new Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.products = [...state.products, payload];
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.products = null;
        state.error = payload;
      })

      // Deleting a Product
      .addCase(deleteProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.products = state.products.filter(
          (product) => product._id !== payload._id
        );
      })
      .addCase(deleteProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.products = null;
        state.error = payload;
      })

      // Updating a product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.products.findIndex(
          (product) => product._id === payload._id
        );

        if (index !== -1) {
          state.products[index] = payload;
        }
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.products = null;
        state.error = payload;
      });
  },
});

export default productSlice.reducer;
