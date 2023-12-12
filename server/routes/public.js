const express = require("express");
const { getBanners } = require("../controllers/global/bannerController");
const { getCategories } = require("../controllers/global/collectionController");
const router = express.Router();

router.get("/banners", getBanners);

router.get("/collections", getCategories);

module.exports = router;
