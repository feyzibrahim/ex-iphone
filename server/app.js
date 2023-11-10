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
const allowedOrigins = ["http://localhost:5173"];
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

// Mounting the routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/super-admin", superAdminRoutes);

// Public Api for accessing images
app.use("/img", express.static(__dirname + "/public/products/"));
app.use("/off", express.static(__dirname + "/public/official/"));

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
