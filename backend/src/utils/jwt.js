import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"
const EXPIRY = "90d" // 90 days

export const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: EXPIRY })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    throw new Error("Invalid or expired token")
  }
}

export const decodeToken = (token) => {
  try {
    return jwt.decode(token)
  } catch (error) {
    return null
  }
}
