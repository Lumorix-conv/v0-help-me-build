import express from "express"
import * as authController from "../controllers/authController.js"
import { validateRegister, handleValidationErrors } from "../middleware/validation.js"

const router = express.Router()

router.post("/register", validateRegister, handleValidationErrors, authController.register)
router.post("/login", authController.login)
router.get("/verify-email", authController.verifyEmail)
router.post("/verify-mobile", authController.verifyMobile)

export default router
