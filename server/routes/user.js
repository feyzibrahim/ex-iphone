const express = require("express");

const {
  signUpUser,
  loginUser,
  getUserDataFirst,
  logoutUser,
} = require("../controllers/userController");

const { getProducts } = require("../controllers/user/productController");
const { sendOTP, validateOTP } = require("../controllers/otpController");

const router = express.Router();

// To get user data on initial page load.
router.get("/", getUserDataFirst);

router.post("/signup", signUpUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

// User Products

router.get("/products", getProducts);

// OTP
router.get("/send-otp", sendOTP);
router.post("/validate-otp", validateOTP);

module.exports = router;
