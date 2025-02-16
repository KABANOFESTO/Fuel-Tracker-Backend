// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicleController');
const vehicleMiddleware = require('../middlewares/vehicleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
// Vehicle routes
router.get('/all', authMiddleware,VehicleController.getAllVehicles);
router.get('/:id', authMiddleware,VehicleController.getVehicleById);
router.post('/register', authMiddleware,vehicleMiddleware, VehicleController.createVehicle);
router.put('/update/:id', authMiddleware,vehicleMiddleware,VehicleController.updateVehicle);
router.delete('/delete/:id', authMiddleware,VehicleController.deleteVehicle);
router.get('/plate/:plateNumber', VehicleController.getVehicleByPlate);

module.exports = router;