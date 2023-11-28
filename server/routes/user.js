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
  getAvailableQuantity,
} = require("../controllers/user/productController");
const {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
  requestReturn,
  generateOrderInvoice,
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
  incrementQuantity,
  decrementQuantity,
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

const {
  getWallet,
  getWalletTotal,
} = require("../controllers/user/walletController");

const {
  addToWishlist,
  deleteOneProductFromWishlist,
  deleteWishlist,
  getWishlist,
} = require("../controllers/user/wishlistController");

const {
  getCoupons,
  applyCoupon,
  removeCoupon,
} = require("../controllers/user/couponController");

const {
  createNewReview,
  readProductReviews,
  readProductReview,
  deleteReview,
  editReview,
  readOrderReview,
} = require("../controllers/user/reviewController");
const { getCategories } = require("../controllers/user/categoryController");

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
router.get("/product-quantity/:id", getAvailableQuantity);

// Order
router.post("/order", createOrder);
router.get("/orders", getOrders);
router.get("/order/:id", getOrder);
router.post("/cancel-order/:id", cancelOrder);
router.post("/request-return/:id", requestReturn);
router.get("/order-invoice/:id", generateOrderInvoice);

// OTP
router.post("/send-otp", sendOTP);
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
router.patch(
  "/cart-increment-quantity/:cartId/item/:productId",
  incrementQuantity
);
router.patch(
  "/cart-decrement-quantity/:cartId/item/:productId",
  decrementQuantity
);

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

// Wallet
router.get("/wallet", getWallet);
router.get("/wallet-total", getWalletTotal);

// Wishlist
router.get("/wishlist", getWishlist);
router.post("/wishlist", addToWishlist);
router.delete("/wishlist-clear/", deleteWishlist);
router.delete("/wishlist-delete-item/:productId", deleteOneProductFromWishlist);

// Coupon
router.get("/coupons", getCoupons);
router.post("/coupon-apply", applyCoupon);
router.get("/coupon-remove", removeCoupon);

// Reviews
router.get("/reviews/:id", readProductReviews);
router.get("/review/:id", readProductReview);
router.post("/review", createNewReview);
router.delete("/review/:id", deleteReview);
router.patch("/review/:id", editReview);
// Review on order details page
router.get("/order-review/:id", readOrderReview);

// Category
router.get("/categories", getCategories);

module.exports = router;
