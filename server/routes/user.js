const express = require("express");

const {
  signUpUser,
  loginUser,
  getUserDataFirst,
  logoutUser,
} = require("../controllers/userController");
const { getProducts } = require("../controllers/user/productController");
const {
  sendOTP,
  validateOTP,
  forgotPassword,
  validateForgotOTP,
  newPassword,
} = require("../controllers/otpController");
const {
  getCart,
  addToCart,
  deleteCart,
} = require("../controllers/user/cartController");

const router = express.Router();

// To get user data on initial page load.
router.get("/", getUserDataFirst);

// Auth
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// User Products
router.get("/products", getProducts);

// OTP
router.get("/send-otp", sendOTP);
router.post("/validate-otp", validateOTP);

// Forget Password
router.post("/forget-password", forgotPassword);
router.post("/forget-password-validate-otp", validateForgotOTP);

router.post("/set-new-password", newPassword);

// Cart
router.get("/cart", getCart);
router.post("/cart", addToCart);
router.delete("/cart/:id", deleteCart);

module.exports = router;
