const express = require("express");

const {
  signUpUser,
  loginUser,
  getUserDataFirst,
  logoutUser,
} = require("../controllers/userController");

const router = express.Router();

// To get user data on initial page load.
router.get("/", getUserDataFirst);

router.post("/signup", signUpUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

module.exports = router;
