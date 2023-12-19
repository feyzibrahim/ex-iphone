const express = require("express");
const { getBanners } = require("../controllers/global/bannerController");
const { getCategories } = require("../controllers/global/collectionController");
const { getIphone } = require("../controllers/global/iPhoneController");

const router = express.Router();

router.get("/banners", getBanners);

router.get("/collections", getCategories);

router.get("/new-iphone", getIphone);

module.exports = router;
