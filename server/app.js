require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
// const cors = require("cors"); // Add it back when communicating with react
const logger = require("morgan");

const app = express();

// Mounting necessary middlewares.
app.use(cookieParser());
// app.use(cors); // Add it back when communicating with react
app.use(express.json());
app.use(logger("dev"));

// Loading Routes

const userRoutes = require("./routes/user");
const { default: mongoose } = require("mongoose");

app.get("/", (req, res) => {
  res.status(200).json({ user: "Hello World" });
});

// Mounting the routes
app.use("/user", userRoutes);

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
