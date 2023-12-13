const express = require("express");
const upload = require("../middleware/upload");
const {
  sendOTP,
  validateOTP,
  forgotPassword,
  validateForgotOTP,
  newPassword,
  resentOTP,
} = require("../controllers/otpController");
const { loginUsingGoogle } = require("../controllers/auth/google");
const { signUpUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// Auth
router.post("/signup", upload.single("profileImgURL"), signUpUser);
router.post("/login", loginUser);
router.post("/google", loginUsingGoogle);

// Forget Password
router.post("/forget-password", forgotPassword);
router.post("/forget-password-validate-otp", validateForgotOTP);
// Set new password
router.post("/set-new-password", newPassword);
// OTP
router.post("/send-otp", sendOTP);
router.post("/validate-otp", validateOTP);
router.post("/resend-otp", resentOTP);

module.exports = router;
