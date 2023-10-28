import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getUserDataFirst } from "./redux/actions/userActions";

// General
import Home from "./page/public/Home";
import Contact from "./page/public/Contact";
import About from "./page/public/About";
import Error404 from "./page/public/Error404";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Auth
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import ValidateOTP from "./page/auth/ValidateOTP";
import ForgetPassword from "./page/auth/ForgetPassword";

import Dashboard from "./page/Dashboard";
import ProductDetails from "./page/user/ProductDetails";

// Admin
import AdminDash from "./page/admin/Dashboard";
import AdminHome from "./page/admin/pages/AdminHome";
import Orders from "./page/admin/pages/Orders";
import Coupon from "./page/admin/pages/Coupon";
import Banner from "./page/admin/pages/Banner";
import Transaction from "./page/admin/pages/Transaction";
import ManageAdmins from "./page/admin/pages/ManageAdmins";
import Customers from "./page/admin/pages/customer/Customers";
import Settings from "./page/admin/pages/Settings";
import Help from "./page/admin/pages/Help";

import Products from "./page/admin/pages/products/Products";
import AddProducts from "./page/admin/pages/products/AddProducts";
import EditProduct from "./page/admin/pages/products/EditProduct";

import Categories from "./page/admin/pages/categories/Categories";
import CreateCategory from "./page/admin/pages/categories/CreateCategory";
import EditCategory from "./page/admin/pages/categories/EditCategory";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      {user ? user.role === "user" && <Navbar /> : <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Dashboard />
              )
            ) : (
              <Home />
            )
          }
        />

        {/* Auth Pages */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="otp" element={<ValidateOTP />} />
        <Route path="forgot-password" element={<ForgetPassword />} />

        {/* General Pages */}
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />

        {/* Product Routes */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Admin Routes */}
        {user && user.role === "admin" ? (
          <Route path="/admin/*" element={<AdminRoutes />} />
        ) : (
          <Route path="/admin" element={<Navigate to="/" />} />
        )}

        <Route path="*" element={<Error404 />} />
      </Routes>
      {user ? user.role === "user" && <Footer /> : <Footer />}
    </BrowserRouter>
  );
}

export default App;

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDash />}>
        <Route index element={<AdminHome />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="products/edit/:id" element={<EditProduct />} />

        <Route path="categories" element={<Categories />} />
        <Route path="categories/create" element={<CreateCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />

        <Route path="orders" element={<Orders />} />
        <Route path="coupon" element={<Coupon />} />
        <Route path="banner" element={<Banner />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="manageAdmins" element={<ManageAdmins />} />
        <Route path="customers" element={<Customers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
