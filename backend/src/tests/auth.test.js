import request from "supertest"
import app from "../server"
import pool from "../config/database"

describe("Authentication APIs", () => {
  afterAll(async () => {
    await pool.end()
  })

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        email: "testuser@example.com",
        password: "TestPassword123!",
        full_name: "Test User",
        gender: "m",
        mobile_no: "+919876543210",
      }

      const response = await request(app).post("/api/auth/register").send(userData)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty("user_id")
    })

    it("should return 400 for invalid email", async () => {
      const userData = {
        email: "invalid-email",
        password: "TestPassword123!",
        full_name: "Test User",
        gender: "m",
        mobile_no: "+919876543210",
      }

      const response = await request(app).post("/api/auth/register").send(userData)

      expect(response.status).toBe(400)
    })

    it("should return 400 for password < 8 characters", async () => {
      const userData = {
        email: "test@example.com",
        password: "short",
        full_name: "Test User",
        gender: "m",
        mobile_no: "+919876543210",
      }

      const response = await request(app).post("/api/auth/register").send(userData)

      expect(response.status).toBe(400)
    })
  })

  describe("POST /api/auth/login", () => {
    it("should login user successfully", async () => {
      const loginData = {
        email: "testuser@example.com",
        password: "TestPassword123!",
      }

      const response = await request(app).post("/api/auth/login").send(loginData)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty("token")
      expect(response.body.data).toHaveProperty("user")
    })

    it("should return 401 for invalid credentials", async () => {
      const loginData = {
        email: "testuser@example.com",
        password: "WrongPassword123!",
      }

      const response = await request(app).post("/api/auth/login").send(loginData)

      expect(response.status).toBe(401)
    })
  })
})
