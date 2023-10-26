const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

// Admin Products controller functions and mounting them to corresponding route
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

// Admin Customer controller functions and mounting them to corresponding route
const {
  getCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/admin/customerController");

router.get("/customers", getCustomers);
router.get("/customer/:id", getCustomer);
router.delete("/customer/:id", deleteCustomer);
router.patch("/customer/:id", updateCustomer);
router.post("/customer", upload.any(), addCustomer);

module.exports = router;
