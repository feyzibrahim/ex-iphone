import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

// Admin
import productsReducer from "./reducers/admin/productSlice";
import customerReducer from "./reducers/admin/customerSlice";
import categoriesReducer from "./reducers/admin/categoriesSlice";
import ordersSlice from "./reducers/admin/ordersSlice";

// User
import userProductsReducer from "./reducers/user/userProductSlice";
import userOrderReducer from "./reducers/user/userOrdersSLice";
import cartReducer from "./reducers/user/cartSlice";
import addressReducer from "./reducers/user/addressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,

    // User Side
    userProducts: userProductsReducer,
    userOrders: userOrderReducer,
    cart: cartReducer,
    address: addressReducer,

    // Admin Side
    products: productsReducer,
    customers: customerReducer,
    categories: categoriesReducer,
    orders: ordersSlice,
  },
});
