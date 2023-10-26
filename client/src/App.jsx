import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getUserDataFirst } from "./redux/actions/userActions";

import Error404 from "./page/Error404";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./page/Contact";
import About from "./page/About";
import Dashboard from "./page/Dashboard";
import ProductDetails from "./page/user/ProductDetails";
import ValidateOTP from "./page/ValidateOTP";
import ForgetPassword from "./page/ForgetPassword";

// Admin
import AdminDash from "./page/admin/Dashboard";
import AdminHome from "./page/admin/pages/AdminHome";
import Category from "./page/admin/pages/Category";
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
        {user && user.role === "admin" && (
          <Route
            path="/admin/*"
            element={user ? <AdminRoutes /> : <Navigate to="/" />}
          />
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
      <Route path="*" element={<AdminDash />}>
        <Route index element={<AdminHome />} />
        <Route path="products" element={<Products />} />
        <Route path="products/addProducts" element={<AddProducts />} />
        <Route path="category" element={<Category />} />
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
