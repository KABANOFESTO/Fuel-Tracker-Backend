// app.js
require("dotenv").config();
const express = require("express");
const auth = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const stationRoutes = require("./routes/stationRoutes");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/users", userRoute);
app.use("/api/stations", stationRoutes);
app.use(errorHandler);

module.exports = app;
