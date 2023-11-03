const express = require("express");
const upload = require("../middleware/upload");

const {
  signUpUser,
  loginUser,
  getUserDataFirst,
  logoutUser,
  editUser,
} = require("../controllers/userController");
const { getProducts } = require("../controllers/user/productController");
const {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
} = require("../controllers/user/orderController");
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
  deleteOneProduct,
} = require("../controllers/user/cartController");
const {
  getAddress,
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} = require("../controllers/user/addressController");

const router = express.Router();

// To get user data on initial page load.
router.get("/", getUserDataFirst);

// Edit User profile
router.post("/edit-profile", upload.single("profileImgURL"), editUser);

// Auth
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Products
router.get("/products", getProducts);

// Order
router.post("/order", createOrder);
router.get("/orders", getOrders);
router.get("/order/:id", getOrder);
router.post("/cancel-order/:id", cancelOrder);

// OTP
router.get("/send-otp", sendOTP);
router.post("/validate-otp", validateOTP);

// Forget Password
router.post("/forget-password", forgotPassword);
router.post("/forget-password-validate-otp", validateForgotOTP);
// Set new password
router.post("/set-new-password", newPassword);

// Cart
router.get("/cart", getCart);
router.post("/cart", addToCart);
router.delete("/cart/:id", deleteCart);
router.delete("/cart/:cartId/item/:productId", deleteOneProduct);

// Address
router.get("/address", getAddresses);
router.get("/address/:id", getAddress);
router.post("/address", createAddress);
router.delete("/address/:id", deleteAddress);
router.patch("/address/:id", updateAddress);

module.exports = router;
