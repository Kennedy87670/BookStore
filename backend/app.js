require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const usersRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productsRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRouter = require("./routes/orderRoutes");

const app = express();

mongoose
  .connect(process.env.local_DB)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log("Error message", error);
  });

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Book Store!");
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  const errorResponse = {
    message: err.message,
  };

  if (req.app.get("env") === "development") {
    errorResponse.error = err;
  }

  // Return JSON response
  res.status(err.status || 500).json(errorResponse);
});

module.exports = app;
