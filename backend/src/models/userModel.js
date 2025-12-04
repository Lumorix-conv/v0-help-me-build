import pool from "../config/database.js"
import bcrypt from "bcrypt"

export const createUser = async (userData) => {
  const { email, password, full_name, gender, mobile_no } = userData
  const hashedPassword = await bcrypt.hash(password, 10)

  const query = `
    INSERT INTO users (email, password, full_name, gender, mobile_no, signup_type)
    VALUES ($1, $2, $3, $4, $5, 'e')
    RETURNING id, email, full_name, gender, mobile_no, is_mobile_verified, is_email_verified
  `

  const result = await pool.query(query, [email, hashedPassword, full_name, gender, mobile_no])
  return result.rows[0]
}

export const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1"
  const result = await pool.query(query, [email])
  return result.rows[0]
}

export const getUserById = async (userId) => {
  const query =
    "SELECT id, email, full_name, gender, mobile_no, is_mobile_verified, is_email_verified FROM users WHERE id = $1"
  const result = await pool.query(query, [userId])
  return result.rows[0]
}

export const updateUserVerification = async (userId, type) => {
  const field = type === "email" ? "is_email_verified" : "is_mobile_verified"
  const query = `
    UPDATE users 
    SET ${field} = true, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id, email, full_name, is_email_verified, is_mobile_verified
  `
  const result = await pool.query(query, [userId])
  return result.rows[0]
}

export const updateUserProfile = async (userId, userData) => {
  const { full_name, gender, mobile_no } = userData
  const query = `
    UPDATE users 
    SET full_name = $1, gender = $2, mobile_no = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING id, email, full_name, gender, mobile_no, is_mobile_verified, is_email_verified
  `
  const result = await pool.query(query, [full_name, gender, mobile_no, userId])
  return result.rows[0]
}
