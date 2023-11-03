const express = require("express");
const upload = require("../middleware/upload");

const {
  addAdmin,
  blockOrUnBlock,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} = require("../controllers/admin/adminController");

const router = express.Router();

// Address
router.get("/admins", getAdmins);
router.get("/admin/:id", getAdmin);
router.delete("/admin/:id", deleteAdmin);
router.patch("/admin/:id", updateAdmin);
router.post("/admin", upload.any(), addAdmin);
router.patch("/admin-block-unblock/:id", blockOrUnBlock);

module.exports = router;
