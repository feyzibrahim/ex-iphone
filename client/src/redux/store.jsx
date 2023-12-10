import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

// Admin
import productsReducer from "./reducers/admin/productSlice";
import customerReducer from "./reducers/admin/customerSlice";
import categoriesReducer from "./reducers/admin/categoriesSlice";
import ordersSlice from "./reducers/admin/ordersSlice";
import paymentsReducer from "./reducers/admin/paymentSlice";
import couponsReducer from "./reducers/admin/couponsSlice";

// Super Admin
import adminReducer from "./reducers/superAdmin/adminSlice";

// User
import userProductsReducer from "./reducers/user/userProductSlice";
import userOrderReducer from "./reducers/user/userOrdersSLice";
import cartReducer from "./reducers/user/cartSlice";
import addressReducer from "./reducers/user/addressSlice";
import walletReducer from "./reducers/user/walletSlice";
import wishlistReducer from "./reducers/user/wishlistSlice";
import reviewReducer from "./reducers/user/reviewSlice";
import buyNowReducer from "./reducers/user/buyNowSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,

    // User Side
    userProducts: userProductsReducer,
    userOrders: userOrderReducer,
    cart: cartReducer,
    address: addressReducer,
    wallet: walletReducer,
    wishlist: wishlistReducer,
    reviews: reviewReducer,
    buyNow: buyNowReducer,

    // Admin Side
    products: productsReducer,
    customers: customerReducer,
    categories: categoriesReducer,
    orders: ordersSlice,
    payments: paymentsReducer,
    coupons: couponsReducer,

    // Super Admin
    admins: adminReducer,
  },
});
