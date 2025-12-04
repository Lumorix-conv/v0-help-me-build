import { auth } from "../config/firebase.js"
import { createUser, getUserByEmail, getUserById, updateUserVerification } from "../models/userModel.js"
import { generateToken } from "../utils/jwt.js"
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/errorHandler.js"

export const register = asyncHandler(async (req, res) => {
  const { email, password, full_name, gender, mobile_no } = req.body

  // Check if user already exists
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email already registered" })
  }

  // Create Firebase user
  const firebaseUser = await auth.createUser({
    email,
    password,
    displayName: full_name,
  })

  // Create database user
  const user = await createUser({ email, password, full_name, gender, mobile_no })

  res.status(201).json({
    success: true,
    message: "User registered successfully. Please verify mobile OTP.",
    data: { user_id: user.id, email: user.email },
  })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await getUserByEmail(email)
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password" })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return res.status(401).json({ success: false, message: "Invalid email or password" })
  }

  const token = generateToken(user.id)

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        mobile_no: user.mobile_no,
        is_email_verified: user.is_email_verified,
        is_mobile_verified: user.is_mobile_verified,
      },
    },
  })
})

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query

  if (!token) {
    return res.status(400).json({ success: false, message: "No verification token provided" })
  }

  try {
    const decodedToken = await auth.verifyIdToken(token)
    const user = await getUserByEmail(decodedToken.email)

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    const updatedUser = await updateUserVerification(user.id, "email")

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: updatedUser,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid or expired token" })
  }
})

export const verifyMobile = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body

  // In a real scenario, verify OTP via Firebase or Twilio
  // For now, we'll accept any OTP and mark as verified
  if (!otp || otp.length !== 6) {
    return res.status(400).json({ success: false, message: "Invalid OTP" })
  }

  const user = await getUserById(userId)
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" })
  }

  const updatedUser = await updateUserVerification(userId, "mobile")

  res.status(200).json({
    success: true,
    message: "Mobile verified successfully",
    data: updatedUser,
  })
})
