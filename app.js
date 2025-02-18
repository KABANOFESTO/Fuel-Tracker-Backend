require("dotenv").config();
const express = require("express");
const cors = require("cors"); // cors here brother!
const auth = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const stationRoutes = require("./routes/stationRoutes");
const errorHandler = require("./middlewares/errorHandler");
const fuelPriceRoutes = require("./routes/fuelPriceRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const fuelTransactionRoutes = require("./routes/fuelTransactionRoutes");
const driverRoutes = require("./routes/driverRoutes");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const app = express();

// Add CORS middleware before other middleware
app.use(
  cors({
    origin: "http://localhost:5173", // our frontend url
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve images statically
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/users", userRoute);
app.use("/api/stations", stationRoutes);
app.use("/api/fuel-prices", fuelPriceRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/fuel-transactions", fuelTransactionRoutes);

app.use(errorHandler);
module.exports = app;
