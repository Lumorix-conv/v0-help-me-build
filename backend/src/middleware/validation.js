import { body, validationResult } from "express-validator"

export const validateRegister = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("full_name").trim().notEmpty(),
  body("gender").isIn(["m", "f", "o"]),
  body("mobile_no").isMobilePhone(),
]

export const validateCompanyProfile = [
  body("company_name").trim().notEmpty(),
  body("address").trim().notEmpty(),
  body("city").trim().notEmpty(),
  body("state").trim().notEmpty(),
  body("country").trim().notEmpty(),
  body("postal_code").trim().notEmpty(),
  body("industry").trim().notEmpty(),
]

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }
  next()
}
