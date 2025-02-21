const { body, validationResult } = require("express-validator");
const StationRepository = require("../repositories/stationRepository");
const FuelPriceRepository = require("../repositories/fuelPriceRepository");

const validateFuelPrice = [
  body("fuelType")
    .trim()
    .notEmpty()
    .withMessage("Fuel type is required")
    .isLength({ min: 3 })
    .withMessage("Fuel type must be at least 3 characters long"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("stationId")
    .notEmpty()
    .withMessage("Station ID is required")
    .isInt({ gt: 0 })
    .withMessage("Station ID must be a positive integer")
    .custom(async (stationId) => {
      const station = await StationRepository.getStationById(stationId);
      if (!station) {
        throw new Error("The assigned station does not exist");
      }
    }),

  body(["fuelType", "stationId"]).custom(async (value, { req }) => {
    const { fuelType, stationId } = req.body;
    const existingFuelPrice =
      await FuelPriceRepository.getFuelPriceByTypeAndStation(
        fuelType,
        stationId
      );
    if (existingFuelPrice) {
      throw new Error(
        "A fuel price for this type already exists at this station"
      );
    }
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateFuelPrice;
