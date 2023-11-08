const express = require("express");
const upload = require("../middleware/upload");

const {
  signUpUser,
  loginUser,
  getUserDataFirst,
  logoutUser,
  editUser,
} = require("../controllers/userController");
const {
  getProducts,
  getProduct,
} = require("../controllers/user/productController");
const {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
  requestReturn,
} = require("../controllers/user/orderController");
const {
  sendOTP,
  validateOTP,
  forgotPassword,
  validateForgotOTP,
  newPassword,
  resentOTP,
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

const {
  createRazerPayOrder,
  verifyPayment,
  getKey,
} = require("../controllers/user/paymentController");

const router = express.Router();

// To get user data on initial page load.
router.get("/", getUserDataFirst);

// Edit User profile
router.post("/edit-profile", upload.single("profileImgURL"), editUser);

// Auth
router.post("/signup", upload.single("profileImgURL"), signUpUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Products
router.get("/products", getProducts);
router.get("/product/:id", getProduct);

// Order
router.post("/order", createOrder);
router.get("/orders", getOrders);
router.get("/order/:id", getOrder);
router.post("/cancel-order/:id", cancelOrder);
router.post("/request-return/:id", requestReturn);

// OTP
router.get("/send-otp", sendOTP);
router.post("/validate-otp", validateOTP);
router.post("/resend-otp", resentOTP);

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

// RazerPay Payment
router.post("/razor-order", createRazerPayOrder);
router.post("/razor-verify", verifyPayment);
router.get("/razor-key", getKey);

module.exports = router;
