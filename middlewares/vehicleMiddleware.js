const { Vehicle } = require("../models");
const vehicleRepository = require("../repositories/vehicleRepository");

const vehicleMiddleware = async (req, res, next) => {
  const { plateNumber, model, fuelType } = req.body;

  // Check if all required fields are provided
  if (!plateNumber || !model || !fuelType) {
    return res.status(400).json({
      message: "All fields are required (plateNumber, model, fuelType).",
    });
  }

  // Validate plate number format (Example: "RAB 123A")
  const plateNumberRegex = /^[A-Z]{3} \d{3}[A-Z]$/;
  if (!plateNumberRegex.test(plateNumber)) {
    return res
      .status(400)
      .json({ message: "Invalid plate number format. Example: 'RAB 123A'." });
  }

  // Check if vehicle with the same plate number already exists using the repository
  const existingVehicle = await vehicleRepository.getVehicleByPlate(
    plateNumber
  );
  if (existingVehicle) {
    return res
      .status(400)
      .json({ message: "Vehicle with this plate number already exists." });
  }

  // Validate fuel type
  const validFuelTypes = ["petrol", "diesel"];
  if (!validFuelTypes.includes(fuelType)) {
    return res.status(400).json({
      message: `Invalid fuel type. Allowed values: ${validFuelTypes.join(
        ", "
      )}.`,
    });
  }

  next();
};

module.exports = vehicleMiddleware;
