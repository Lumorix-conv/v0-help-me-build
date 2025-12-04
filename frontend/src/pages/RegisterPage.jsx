"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { toast } from "react-toastify"
import { registerUser, verifyMobile } from "../api/authService"

const RegisterPage = () => {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null)
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = watch("password")

  const onSubmitRegistration = async (data) => {
    setLoading(true)
    setError(null)

    try {
      const userData = {
        ...data,
        mobile_no: `+${phone}`,
      }
      const response = await registerUser(userData)
      if (response.success) {
        setUserId(response.data.user_id)
        setStep(1)
        toast.success("Registration successful! Please verify your mobile OTP.")
      }
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await verifyMobile(userId, otp)
      if (response.success) {
        toast.success("Mobile verified successfully!")
        setStep(2)
      }
    } catch (err) {
      const message = err.response?.data?.message || "OTP verification failed"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleNavigateToDashboard = () => {
    navigate("/dashboard")
  }

  const steps = ["Enter Details", "Verify Mobile", "Complete"]

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={0}
        sx={{
          p: "var(--space-8)",
          mt: "var(--space-4)",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          border: "1px solid var(--border)",
        }}
      >
        <Box sx={{ mb: "var(--space-6)", textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "var(--text-primary)",
              mb: "var(--space-2)",
            }}
          >
            Register Your Company
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--text-secondary)",
              fontSize: "var(--text-base)",
            }}
          >
            Complete your profile to get started
          </Typography>
        </Box>

        <Stepper
          activeStep={step}
          sx={{
            mb: "var(--space-6)",
            "& .MuiStepLabel-label": {
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--text-secondary)",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

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

        {step === 0 && (
          <form onSubmit={handleSubmit(onSubmitRegistration)}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              {...register("full_name", { required: "Full name is required" })}
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--bg-secondary)",
                },
              }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--bg-secondary)",
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--bg-secondary)",
                },
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--bg-secondary)",
                },
              }}
            />

            <FormControl
              fullWidth
              margin="normal"
              error={!!errors.gender}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--bg-secondary)",
                },
              }}
            >
              <InputLabel>Gender</InputLabel>
              <Select label="Gender" {...register("gender", { required: "Gender is required" })}>
                <MenuItem value="m">Male</MenuItem>
                <MenuItem value="f">Female</MenuItem>
                <MenuItem value="o">Other</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mt: "var(--space-2)", mb: "var(--space-3)" }}>
              <Typography variant="body2" sx={{ mb: "var(--space-1)" }}>
                Mobile Number
              </Typography>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={setPhone}
                containerStyle={{ width: "100%" }}
                inputStyle={{ width: "100%" }}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                mt: "var(--space-6)",
                py: "var(--space-3)",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "var(--radius-lg)",
              }}
            >
              {loading ? "Registering..." : "Next"}
            </Button>
          </form>
        )}

        {step === 1 && (
          <Box>
            <Typography variant="body2" sx={{ mb: "var(--space-2)" }}>
              A 6-digit OTP has been sent to your phone number. Please enter it below.
            </Typography>

            <TextField
              fullWidth
              label="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 6))}
              margin="normal"
              inputProps={{ maxLength: 6 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--bg-secondary)",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyOTP}
              disabled={loading}
              sx={{
                mt: "var(--space-6)",
                py: "var(--space-3)",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "var(--radius-lg)",
              }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => setStep(0)}
              sx={{
                mt: "var(--space-4)",
                py: "var(--space-3)",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "var(--radius-lg)",
              }}
            >
              Back
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                mb: "var(--space-2)",
                color: "var(--text-success)",
              }}
            >
              Registration Complete!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: "var(--space-6)",
                color: "var(--text-secondary)",
                fontSize: "var(--text-base)",
              }}
            >
              Your account has been verified successfully. Please proceed to create your company profile.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={handleNavigateToDashboard}
              sx={{
                py: "var(--space-3)",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "var(--radius-lg)",
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        )}

        {step === 0 && (
          <Box
            sx={{
              textAlign: "center",
              mt: "var(--space-4)",
              pt: "var(--space-4)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
              Already have an account?{" "}
              <Button
                color="primary"
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  p: 0,
                  ml: "var(--space-1)",
                }}
              >
                Sign in
              </Button>
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default RegisterPage
