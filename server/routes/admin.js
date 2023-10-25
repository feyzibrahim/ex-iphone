const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/admin/productController");

router.get("/products", getProducts);

router.get("/product/:id", getProduct);

router.delete("/product/:id", deleteProduct);

router.patch("/product/:id", updateProduct);

router.post("/product", upload.any(), addProduct);

module.exports = router;
