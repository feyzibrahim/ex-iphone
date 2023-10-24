const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/products", getProducts);

router.get("/product/:id", getProduct);

router.delete("/product/:id", deleteProduct);

router.patch("/product/:id", updateProduct);

router.post("/product", upload.array("moreImageURL"), addProduct);

module.exports = router;
