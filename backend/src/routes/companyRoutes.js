import express from "express"
import * as companyController from "../controllers/companyController.js"
import { authMiddleware } from "../middleware/auth.js"
import { validateCompanyProfile, handleValidationErrors } from "../middleware/validation.js"

const router = express.Router()

router.post(
  "/register",
  authMiddleware,
  validateCompanyProfile,
  handleValidationErrors,
  companyController.registerCompany,
)
router.get("/profile", authMiddleware, companyController.getCompanyProfile)
router.put("/profile", authMiddleware, companyController.updateCompany)
router.post("/upload-logo", authMiddleware, companyController.uploadLogo)
router.post("/upload-banner", authMiddleware, companyController.uploadBanner)

export default router
