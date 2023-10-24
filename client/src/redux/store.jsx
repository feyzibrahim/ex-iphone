import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import productsReducer from "./reducers/admin/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Admin Side
    products: productsReducer,
  },
});
