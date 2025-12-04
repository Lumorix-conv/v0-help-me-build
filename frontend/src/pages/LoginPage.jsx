"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Container, Paper, TextField, Button, Typography, Box, Alert, CircularProgress } from "@mui/material"
import { toast } from "react-toastify"
import { loginUser } from "../api/authService"
import { setUser, setToken } from "../store/slices/authSlice"

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    setError(null)
    console.log("[v0] Login attempt with email:", data.email)

    try {
      const response = await loginUser(data)
      if (response.success) {
        console.log("[v0] Login successful, token received")
        dispatch(setToken(response.data.token))
        dispatch(setUser(response.data.user))
        toast.success("Login successful!")
        navigate("/dashboard")
      }
    } catch (err) {
      console.log("[v0] Login error:", err.response?.data?.message)
      const message = err.response?.data?.message || "Login failed"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, var(--primary-light) 0%, #f8fafc 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: "var(--space-8)",
            borderRadius: "var(--radius-2xl)",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "1px solid var(--border)",
          }}
        >
          <Box sx={{ mb: "var(--space-8)", textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "var(--text-primary)",
                mb: "var(--space-2)",
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-base)",
              }}
            >
              Sign in to your company account
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: "var(--space-4)",
                backgroundColor: "#fee2e2",
                color: "#991b1b",
                borderColor: "#fca5a5",
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="your@company.com"
              margin="normal"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--bg-secondary)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border)",
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="••••••••"
              margin="normal"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--bg-secondary)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border)",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                mt: "var(--space-6)",
                mb: "var(--space-3)",
                py: "var(--space-3)",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                fontWeight: 600,
                fontSize: "var(--text-base)",
                textTransform: "none",
                borderRadius: "var(--radius-lg)",
                transition: "all var(--transition-base)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 24px rgba(0, 102, 255, 0.3)",
                },
                "&:disabled": {
                  background: "var(--border)",
                  color: "var(--text-tertiary)",
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <CircularProgress size={20} sx={{ color: "inherit" }} />
                  Signing in...
                </Box>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <Box sx={{ textAlign: "center", pt: "var(--space-4)", borderTop: "1px solid var(--border)" }}>
            <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
              Don't have an account?{" "}
              <Button
                color="primary"
                onClick={() => navigate("/register")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  p: 0,
                  ml: "var(--space-1)",
                }}
              >
                Create one
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage
