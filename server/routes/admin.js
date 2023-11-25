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
const {
  getCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  blockOrUnBlockCustomer,
} = require("../controllers/admin/customerController");
const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/admin/categoryController");
const {
  getOrders,
  getOrder,
  clearOrder,
  updateOrderStatus,
  generateOrderInvoice,
} = require("../controllers/admin/orderController");
const {
  generateOrderExcel,
  generateOrderPDF,
  generateOrderCSV,
} = require("../controllers/admin/orderExportController");
const {
  getReturnCount,
  getReturnOrders,
  getReturnOrder,
  updateReturnOrderStatus,
} = require("../controllers/admin/returnController");
const {
  getPayments,
  clearPayments,
} = require("../controllers/admin/paymentController");
const { clearWallet } = require("../controllers/admin/walletController");
const {
  getCoupons,
  getCoupon,
  addCoupon,
  editCoupon,
  deleteCoupon,
} = require("../controllers/admin/couponController");
const { generateExcel } = require("../controllers/admin/reportController");
const {
  readRevenueData,
  readUserCount,
  readSalesData,
  readProfitData,
  readMostSoldProducts,
} = require("../controllers/admin/dashController");
const {
  addBanners,
  readBanners,
  deleteBanner,
  updateBannerOrder,
} = require("../controllers/admin/bannerController");

// Products controller functions mounting them to corresponding route
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.delete("/product/:id", deleteProduct);
router.patch("/product/:id", upload.any(), updateProduct);
router.post("/product", upload.any(), addProduct);

// Customer controller functions mounting them to corresponding route
router.get("/customers", getCustomers);
router.get("/customer/:id", getCustomer);
router.delete("/customer/:id", deleteCustomer);
router.patch("/customer/:id", updateCustomer);
router.post("/customer", upload.any(), addCustomer);
router.patch("/customer-block-unblock/:id", blockOrUnBlockCustomer);

// Category controller functions mounting them to corresponding route
router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.delete("/category/:id", deleteCategory);
router.patch("/category/:id", upload.single("imgURL"), updateCategory);
router.post("/category", upload.single("imgURL"), createCategory);

// Order controller functions mounting them to corresponding route
router.get("/orders", getOrders);
router.delete("/clear-orders", clearOrder);
router.get("/order/:id", getOrder);
router.patch("/order-status/:id", updateOrderStatus);
router.get("/order-generate-excel", generateOrderExcel); // Generating Excel
router.get("/order-generate-pdf", generateOrderPDF); // Generating PDF
router.get("/order-generate-csv", generateOrderCSV); // Generating PDF
router.get("/order-invoice/:id", generateOrderInvoice);

// Return Order controller functions mounting them to corresponding route
router.get("/return-orders-count", getReturnCount);
router.get("/return-orders", getReturnOrders);
router.get("/return-order/:id", getReturnOrder);
router.patch("/return-order-status/:id", updateReturnOrderStatus);

// Payment controller function importing mounting
router.get("/payments", getPayments);
router.get("/clear-payments", clearPayments);

// Clear Wallet for testing purpose
router.get("/clear-wallet", clearWallet);

// Coupon Controller functions mounting
router.get("/coupons", getCoupons);
router.get("/coupon/:id", getCoupon);
router.delete("/coupon/:id", deleteCoupon);
router.patch("/coupon/:id", editCoupon);
router.post("/coupon", addCoupon);

// Generate Orders Excel
router.get("/generateReport", generateExcel);

// Admin Dashboard data | Chart data
router.get("/revenue-report", readRevenueData);
router.get("/sales-report", readSalesData);
router.get("/profit-report", readProfitData);
router.get("/user-count", readUserCount);
router.get("/most-sold-product", readMostSoldProducts);

// Banner Controllers
router.post("/banners", upload.any(), addBanners);
router.get("/banners", readBanners);
router.patch("/banners/", updateBannerOrder);
router.delete("/banner/:id", deleteBanner);

module.exports = router;
