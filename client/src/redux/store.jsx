import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

// Admin
import productsReducer from "./reducers/admin/productSlice";
import customerSlice from "./reducers/admin/customerSlice";
import categoriesSlice from "./reducers/admin/categoriesSlice";

// User
import userProductsReducer from "./reducers/user/userProductSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,

    // User Side
    userProducts: userProductsReducer,

    // Admin Side
    products: productsReducer,
    customers: customerSlice,
    categories: categoriesSlice,
  },
});
