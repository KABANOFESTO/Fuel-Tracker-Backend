// app.js
require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoute");
// const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use(errorHandler);

module.exports = app;
