require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Add it back when communicating with react
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Mounting necessary middlewares.
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Setting up cors
const allowedOrigins = [process.env.CLIENT_URL];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));

// Loading Routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const superAdminRoutes = require("./routes/superAdmin");
const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");

// Auth middleware

const { requireAuth, requireAdminAuth } = require("./middleware/requireAuth");

// Mounting the routes
app.use("/api/auth", authRoutes);
app.use("/api/user", requireAuth, userRoutes);
app.use("/api/admin", requireAdminAuth, adminRoutes);
app.use("/api/super-admin", requireAdminAuth, superAdminRoutes);
app.use("/api/public", publicRoutes);

// Public Api for accessing images
app.use("/api/img", express.static(__dirname + "/public/products/"));
app.use("/api/off", express.static(__dirname + "/public/official/"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on Port: ${process.env.PORT} - DB Connected`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
