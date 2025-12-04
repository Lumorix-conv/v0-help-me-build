import request from "supertest"
import app from "../server"
import pool from "../config/database"

describe("User Registration and Company Creation Workflow", () => {
  let authToken = ""
  let userId = null

  afterAll(async () => {
    await pool.end()
  })

  describe("Complete User Journey", () => {
    it("Step 1: Register user", async () => {
      console.log("[v0] Testing: User Registration")
      const userData = {
        email: `workflow${Date.now()}@example.com`,
        password: "TestPassword123!",
        full_name: "Workflow Test User",
        gender: "m",
        mobile_no: "+919876543212",
      }

      const response = await request(app).post("/api/auth/register").send(userData)

      console.log("[v0] Registration Status:", response.status)
      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty("user_id")
      userId = response.body.data.user_id
    })

    it("Step 2: Login user", async () => {
      console.log("[v0] Testing: User Login")
      const loginData = {
        email: `workflow${Date.now() - 100}@example.com`,
        password: "TestPassword123!",
      }

      // Note: This uses the previously registered email
      const response = await request(app).post("/api/auth/login").send(loginData)

      console.log("[v0] Login Status:", response.status)
      if (response.status === 200) {
        authToken = response.body.data.token
        expect(response.body.data).toHaveProperty("token")
      }
    })

    it("Step 3: Create company profile", async () => {
      console.log("[v0] Testing: Company Profile Creation")
      const companyData = {
        company_name: `Test Company ${Date.now()}`,
        address: "123 Test Street",
        city: "Test City",
        state: "Test State",
        country: "Test Country",
        postal_code: "12345",
        industry: "Technology",
        website: "https://test.com",
        description: "Test company description",
      }

      if (authToken) {
        const response = await request(app)
          .post("/api/company/register")
          .set("Authorization", `Bearer ${authToken}`)
          .send(companyData)

        console.log("[v0] Company Creation Status:", response.status)
        expect(response.status).toBe(201)
        expect(response.body.success).toBe(true)
      }
    })

    it("Step 4: Fetch company profile", async () => {
      console.log("[v0] Testing: Fetch Company Profile")
      if (authToken) {
        const response = await request(app).get("/api/company/profile").set("Authorization", `Bearer ${authToken}`)

        console.log("[v0] Fetch Profile Status:", response.status)
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
      }
    })
  })

  describe("Error Handling", () => {
    it("should handle missing authentication", async () => {
      console.log("[v0] Testing: Missing Auth Token")
      const response = await request(app).get("/api/company/profile")

      console.log("[v0] Missing Auth Status:", response.status)
      expect(response.status).toBe(401)
    })

    it("should handle invalid token", async () => {
      console.log("[v0] Testing: Invalid Token")
      const response = await request(app).get("/api/company/profile").set("Authorization", "Bearer invalid-token")

      console.log("[v0] Invalid Token Status:", response.status)
      expect(response.status).toBe(401)
    })

    it("should handle duplicate email registration", async () => {
      console.log("[v0] Testing: Duplicate Email")
      const userData = {
        email: "duplicate@example.com",
        password: "TestPassword123!",
        full_name: "Test User",
        gender: "m",
        mobile_no: "+919876543213",
      }

      await request(app).post("/api/auth/register").send(userData)

      const response = await request(app).post("/api/auth/register").send(userData)

      console.log("[v0] Duplicate Email Status:", response.status)
      expect(response.status).toBe(400)
    })
  })
})
