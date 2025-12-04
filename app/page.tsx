"use client"

import { Container, Paper, Typography, Button, Box, Grid, Card, CardContent } from "@mui/material"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
          Company Registration & Verification Module
        </Typography>
        <Typography variant="h6" sx={{ color: "#666", mb: 4 }}>
          A comprehensive full-stack application for company registration, verification, and profile management
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Frontend (Vite + React)
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Modern React 19 application with Redux state management, Material-UI components, and responsive design.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Features:
                </Typography>
                <ul>
                  <li>User authentication & registration</li>
                  <li>Multi-step company profile form</li>
                  <li>Dashboard & settings pages</li>
                  <li>Image upload with drag-drop</li>
                </ul>
              </Box>
              <Button variant="contained">
                Location: <code>/frontend</code>
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Backend (Node.js + Express)
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Scalable API server with PostgreSQL, Firebase authentication, and Cloudinary integration.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Features:
                </Typography>
                <ul>
                  <li>JWT authentication (90-day validity)</li>
                  <li>Firebase email/SMS OTP verification</li>
                  <li>Company CRUD operations</li>
                  <li>Image upload to Cloudinary</li>
                </ul>
              </Box>
              <Button variant="contained">
                Location: <code>/backend</code>
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 4, backgroundColor: "#f5f5f5", mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Getting Started
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This project uses separate frontend and backend. Run them independently:
        </Typography>
        <Box
          component="pre"
          sx={{
            backgroundColor: "#1a1a2e",
            color: "#00ff00",
            p: 2,
            borderRadius: 1,
            overflow: "auto",
            mb: 2,
          }}
        >
          {`# Terminal 1: Backend
cd backend
npm install
npm run dev
# Runs on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000`}
        </Box>
      </Paper>

      <Paper sx={{ p: 4, backgroundColor: "#f0f7ff" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Documentation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>API Documentation:</strong> backend/API_DOCUMENTATION.md
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Technical Docs:</strong> backend/TECHNICAL_DOCUMENTATION.md
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="body2" sx={{ color: "#666" }}>
          Deadline: August 13, 2025 | Status: Ready for Demo
        </Typography>
      </Box>
    </Container>
  )
}
