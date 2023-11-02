const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

// Products controller functions and mounting them to corresponding route
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
router.patch("/product/:id", upload.any(), updateProduct);
router.post("/product", upload.any(), addProduct);

// Customer controller functions and mounting them to corresponding route
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

// Category controller functions and mounting them to corresponding route
const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/admin/categoryController");

router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.delete("/category/:id", deleteCategory);
router.patch("/category/:id", upload.single("imgURL"), updateCategory);
router.post("/category", upload.single("imgURL"), createCategory);

// Order controller functions and mounting them to corresponding route

const {
  getOrders,
  clearOrder,
  updateOrderStatus,
} = require("../controllers/admin/orderController");

router.get("/orders", getOrders);
router.patch("/order-status/:id", updateOrderStatus);
router.delete("/clear-orders", clearOrder);

module.exports = router;
