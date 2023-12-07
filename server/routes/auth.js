const express = require("express");
const upload = require("../middleware/upload");

const { loginUsingGoogle } = require("../controllers/auth/google");
const { signUpUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// Auth
router.post("/signup", upload.single("profileImgURL"), signUpUser);
router.post("/login", loginUser);
router.post("/google", loginUsingGoogle);

module.exports = router;
