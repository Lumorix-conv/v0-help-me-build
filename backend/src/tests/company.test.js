import request from "supertest"
import app from "../server"
import pool from "../config/database"

let authToken = ""
let userId = null

describe("Company Profile APIs", () => {
  beforeAll(async () => {
    // Register and login a user
    const userData = {
      email: "companyuser@example.com",
      password: "TestPassword123!",
      full_name: "Company User",
      gender: "f",
      mobile_no: "+919876543211",
    }

    await request(app).post("/api/auth/register").send(userData)

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password })

    authToken = loginResponse.body.data.token
    userId = loginResponse.body.data.user.id
  })

  afterAll(async () => {
    await pool.end()
  })

  describe("POST /api/company/register", () => {
    it("should create company profile with valid data", async () => {
      const companyData = {
        company_name: "Tech Startup Inc",
        address: "123 Tech Street",
        city: "San Francisco",
        state: "California",
        country: "USA",
        postal_code: "94105",
        industry: "Technology",
        website: "https://techstartup.com",
      }

      const response = await request(app)
        .post("/api/company/register")
        .set("Authorization", `Bearer ${authToken}`)
        .send(companyData)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty("id")
    })

    it("should return 401 without authentication", async () => {
      const companyData = {
        company_name: "Tech Startup Inc",
        address: "123 Tech Street",
        city: "San Francisco",
        state: "California",
        country: "USA",
        postal_code: "94105",
        industry: "Technology",
      }

      const response = await request(app).post("/api/company/register").send(companyData)

      expect(response.status).toBe(401)
    })
  })

  describe("GET /api/company/profile", () => {
    it("should fetch company profile", async () => {
      const response = await request(app).get("/api/company/profile").set("Authorization", `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty("company_name")
    })

    it("should return 401 without token", async () => {
      const response = await request(app).get("/api/company/profile")

      expect(response.status).toBe(401)
    })
  })

  describe("PUT /api/company/profile", () => {
    it("should update company profile", async () => {
      const updateData = {
        company_name: "Tech Startup Inc Updated",
        website: "https://newwebsite.com",
      }

      const response = await request(app)
        .put("/api/company/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
    })
  })
})
