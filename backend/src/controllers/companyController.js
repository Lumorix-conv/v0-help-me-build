import { createCompanyProfile, getCompanyProfileByUserId, updateCompanyProfile } from "../models/companyModel.js"
import { asyncHandler } from "../utils/errorHandler.js"
import axios from "axios"

export const registerCompany = asyncHandler(async (req, res) => {
  const userId = req.userId
  const companyData = req.body

  // Check if company already exists for user
  const existingCompany = await getCompanyProfileByUserId(userId)
  if (existingCompany) {
    return res.status(400).json({ success: false, message: "Company profile already exists for this user" })
  }

  const company = await createCompanyProfile(userId, companyData)

  res.status(201).json({
    success: true,
    message: "Company profile created successfully",
    data: company,
  })
})

export const getCompanyProfile = asyncHandler(async (req, res) => {
  const userId = req.userId

  const company = await getCompanyProfileByUserId(userId)
  if (!company) {
    return res.status(404).json({ success: false, message: "Company profile not found" })
  }

  res.status(200).json({
    success: true,
    data: company,
  })
})

export const updateCompany = asyncHandler(async (req, res) => {
  const userId = req.userId
  const companyData = req.body

  const company = await getCompanyProfileByUserId(userId)
  if (!company) {
    return res.status(404).json({ success: false, message: "Company profile not found" })
  }

  const updatedCompany = await updateCompanyProfile(company.id, companyData)

  res.status(200).json({
    success: true,
    message: "Company profile updated successfully",
    data: updatedCompany,
  })
})

export const uploadLogo = asyncHandler(async (req, res) => {
  const userId = req.userId

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" })
  }

  // Upload to Cloudinary (using direct API call for simplicity)
  const formData = new FormData()
  formData.append("file", req.file.buffer, req.file.originalname)
  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET)

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    )

    const logoUrl = response.data.secure_url

    // Update company profile with logo URL
    const company = await getCompanyProfileByUserId(userId)
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found" })
    }

    const updatedCompany = await updateCompanyProfile(company.id, { logo_url: logoUrl })

    res.status(200).json({
      success: true,
      message: "Logo uploaded successfully",
      data: { logo_url: logoUrl, company: updatedCompany },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to upload logo", error: error.message })
  }
})

export const uploadBanner = asyncHandler(async (req, res) => {
  const userId = req.userId

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" })
  }

  const formData = new FormData()
  formData.append("file", req.file.buffer, req.file.originalname)
  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET)

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    )

    const bannerUrl = response.data.secure_url

    const company = await getCompanyProfileByUserId(userId)
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found" })
    }

    const updatedCompany = await updateCompanyProfile(company.id, { banner_url: bannerUrl })

    res.status(200).json({
      success: true,
      message: "Banner uploaded successfully",
      data: { banner_url: bannerUrl, company: updatedCompany },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to upload banner", error: error.message })
  }
})
