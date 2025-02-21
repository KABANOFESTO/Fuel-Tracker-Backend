const { body, validationResult } = require("express-validator");
const driverRepository = require("../repositories/DriverRepository");
const vehicleRepository = require("../repositories/vehicleRepository");

// Validation for driver name
const validateDriverName = body("name")
  .trim()
  .notEmpty()
  .withMessage("Driver name is required")
  .isLength({ min: 3 })
  .withMessage("Name must be at least 3 characters");

// Validation for unique licenseNumber
const validateLicenseNumber = body("licenseNumber")
  .trim()
  .notEmpty()
  .withMessage("License number is required")
  .custom(async (licenseNumber) => {
    const existingDriver = await driverRepository.getDriverByLicenseNumber(
      licenseNumber
    );
    if (existingDriver) {
      throw new Error("A driver with this license number already exists");
    }
  });

// // Validation for vehicle existence
const validateVehicleId = body("vehicleId")
  .notEmpty()
  .withMessage("Vehicle ID is required")
  .isInt({ gt: 0 })
  .withMessage("Vehicle ID must be a positive integer")
  .custom(async (vehicleId) => {
    console.log("Validating vehicleId:", vehicleId); // Debugging log

    const vehicle = await vehicleRepository.getVehicleById(vehicleId);

    console.log("Found vehicle:", vehicle); // Check if it returns null

    if (!vehicle) {
      console.log("Validation failed: Vehicle does not exist"); // Confirm failure
      return Promise.reject("The assigned vehicle does not exist");
    }
  });

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Export each validation separately
module.exports = {
  validateDriverName,
  validateLicenseNumber,
  validateVehicleId,
  handleValidationErrors,
};
