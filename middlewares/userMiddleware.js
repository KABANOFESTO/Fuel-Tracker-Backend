const { body, validationResult } = require("express-validator");
const userRepository = require("../repositories/userRepository");

const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character"),

  // Custom validation to check if the user already exists
  body("email").custom(async (email) => {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
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
const validateUserUpdate = [
  body("email")
    .optional() // ✅ This ensures email validation runs only if email is provided
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const userId = req.params.id;
      const existingUser = await userRepository.findById(userId);
      if (!existingUser) {
        throw new Error("User not found");
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

module.exports = {
  validateRegister,
  validateUserUpdate, // Ensure this is exported
};
