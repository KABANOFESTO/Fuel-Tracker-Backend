const { body, validationResult } = require("express-validator");
const StationRepository = require("../repositories/stationRepository");

const validateStation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Station name is required")
    .isLength({ min: 3 })
    .withMessage("Station name must be at least 3 characters long"),

  body("location").trim().notEmpty().withMessage("Location is required"),

  body(["name", "location"]).custom(async (value, { req }) => {
    const { name, location } = req.body;
    const existingStation = await StationRepository.getStationByNameAndLocation(
      name,
      location
    );
    if (existingStation) {
      throw new Error("A station with this name and location already exists");
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

module.exports = validateStation;
