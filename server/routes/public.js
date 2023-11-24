const express = require("express");
const { getBanners } = require("../controllers/public/bannerController");

const router = express.Router();

router.get("/banners", getBanners);

module.exports = router;
