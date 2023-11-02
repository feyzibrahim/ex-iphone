import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

// Admin
import productsReducer from "./reducers/admin/productSlice";
import customerSlice from "./reducers/admin/customerSlice";
import categoriesSlice from "./reducers/admin/categoriesSlice";

// User
import userProductsReducer from "./reducers/user/userProductSlice";
import cartReducer from "./reducers/user/cartSlice";
import addressReducer from "./reducers/user/addressSlice";
import ordersSlice from "./reducers/admin/ordersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,

    // User Side
    userProducts: userProductsReducer,
    cart: cartReducer,
    address: addressReducer,

    // Admin Side
    products: productsReducer,
    customers: customerSlice,
    categories: categoriesSlice,
    orders: ordersSlice,
  },
});
