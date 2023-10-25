import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import productsReducer from "./reducers/admin/productSlice";
import userProductsReducer from "./reducers/user/userProductSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,

    // User Side
    userProducts: userProductsReducer,

    // Admin Side
    products: productsReducer,
  },
});
