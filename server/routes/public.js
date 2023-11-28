const express = require("express");
const { getBanners } = require("../controllers/global/bannerController");

const router = express.Router();

router.get("/banners", getBanners);

module.exports = router;
