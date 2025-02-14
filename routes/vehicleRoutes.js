// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicleController');

// Vehicle routes
router.get('/all', VehicleController.getAllVehicles);
router.get('/:id', VehicleController.getVehicleById);
router.post('/register', VehicleController.createVehicle);
router.put('/update/:id', VehicleController.updateVehicle);
router.delete('/delete/:id', VehicleController.deleteVehicle);
router.get('/plate/:plateNumber', VehicleController.getVehicleByPlate);

module.exports = router;