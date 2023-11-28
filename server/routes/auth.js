const express = require("express");
const { loginUsingGoogle } = require("../controllers/auth/google");

const router = express.Router();

router.post("/google", loginUsingGoogle);

module.exports = router;
