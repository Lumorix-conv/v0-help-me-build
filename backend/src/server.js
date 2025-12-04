import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import debugRequest from "./middleware/debugger.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || "development"

// Middleware
app.use(helmet())
app.use(compression())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (NODE_ENV === "development") {
  app.use(debugRequest)
  console.log("[v0] Debug mode enabled")
}

// Health check
app.get("/api/health", (req, res) => {
  console.log("[v0] Health check requested")
  res.status(200).json({ success: true, message: "Server is running", environment: NODE_ENV })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/company", companyRoutes)

// 404 handler
app.use((req, res) => {
  console.log("[v0] Route not found:", req.method, req.path)
  res.status(404).json({ success: false, message: "Route not found" })
})

// Error handler
app.use((err, req, res, next) => {
  console.error("[v0] Error caught by error handler:", err.message)
  res.status(err.statusCode || 500).json({
    success: false,
    message: NODE_ENV === "production" ? "Internal server error" : err.message,
  })
})

export default app

app.listen(PORT, () => {
  console.log(`[v0] Server running on port ${PORT}`)
  console.log(`[v0] Environment: ${NODE_ENV}`)
  console.log(`[v0] Client URL: ${process.env.CLIENT_URL || "http://localhost:3000"}`)
})
