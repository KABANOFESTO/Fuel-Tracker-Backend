// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");


// const StationController = require("../controllers/stationController");
// const FuelPriceController = require("../controllers/fuelPriceController");
// const VehicleController = require("../controllers/vehicleController");
// const DriverController = require("../controllers/driverController");
// const FuelTransactionController = require("../controllers/fuelTransactionController");
// const ReportController = require("../controllers/reportController");
// const AdminController = require("../controllers/adminController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
// Protect this route with middleware
router.post("/refresh-token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);

// User routes
/*router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.get('/users/roles', UserController.getUserRoles);

// Station routes
router.get('/stations', StationController.getAllStations);
router.get('/stations/:id', StationController.getStationById);
router.post('/stations', StationController.createStation);
router.put('/stations/:id', StationController.updateStation);
router.delete('/stations/:id', StationController.deleteStation);

// Fuel Price routes
router.get('/fuel-prices', FuelPriceController.getAllPrices);
router.get('/fuel-prices/:stationId', FuelPriceController.getPricesByStation);
router.post('/fuel-prices', FuelPriceController.setFuelPrice);
router.put('/fuel-prices/:id', FuelPriceController.updateFuelPrice);
router.delete('/fuel-prices/:id', FuelPriceController.deleteFuelPrice);

// Vehicle routes
router.get('/vehicles', VehicleController.getAllVehicles);
router.get('/vehicles/:id', VehicleController.getVehicleById);
router.post('/vehicles', VehicleController.registerVehicle);
router.put('/vehicles/:id', VehicleController.updateVehicle);
router.delete('/vehicles/:id', VehicleController.deleteVehicle);
router.get('/vehicles/plate/:plateNumber', VehicleController.getVehicleByPlate);

// Driver routes
router.get('/drivers', DriverController.getAllDrivers);
router.get('/drivers/:id', DriverController.getDriverById);
router.post('/drivers', DriverController.registerDriver);
router.put('/drivers/:id', DriverController.updateDriver);
router.delete('/drivers/:id', DriverController.deleteDriver);

// Fuel Transaction routes
router.get('/fuel-transactions', FuelTransactionController.getAllTransactions);
router.get('/fuel-transactions/:id', FuelTransactionController.getTransactionById);
router.get('/fuel-transactions/vehicle/:plateNumber', FuelTransactionController.getTransactionsByVehicle);
router.post('/fuel-transactions', FuelTransactionController.recordTransaction);
router.delete('/fuel-transactions/:id', FuelTransactionController.deleteTransaction);

// Report routes
router.get('/reports/fuel-usage', ReportController.getFuelUsageReport);
router.get('/reports/sales/:stationId', ReportController.getSalesReport);
router.get('/reports/vehicle/:vehicleId', ReportController.getVehicleFuelHistory);

// Admin routes
router.get('/admin/dashboard', AdminController.getDashboard);
router.get('/admin/users', AdminController.viewAllUsers);
router.get('/admin/transactions', AdminController.viewAllTransactions);
*/
module.exports = router;

