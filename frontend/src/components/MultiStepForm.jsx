"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Stepper, Step, StepLabel, Button, Box, Typography, TextField } from "@mui/material"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { registerCompanyProfile } from "../api/companyService"
import { setProfile, setCurrentStep } from "../store/slices/companySlice"
import { toast } from "react-toastify"

const MultiStepForm = ({ onComplete }) => {
  const dispatch = useDispatch()
  const { currentStep } = useSelector((state) => state.company)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    company_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    website: "",
    industry: "",
    founded_date: null,
    description: "",
  })

  const steps = ["Basic Info", "Address", "Additional Info"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, founded_date: date }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1))
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1))
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const dataToSubmit = {
        ...formData,
        founded_date: formData.founded_date ? formData.founded_date.toISOString().split("T")[0] : null,
      }
      const response = await registerCompanyProfile(dataToSubmit)
      if (response.success) {
        dispatch(setProfile(response.data))
        toast.success("Company profile created successfully!")
        onComplete()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create company profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 4 }}>
        {currentStep === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Basic Company Information
            </Typography>
            <TextField
              fullWidth
              label="Company Name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
        )}

        {currentStep === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Company Address
            </Typography>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Postal Code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Box>
        )}

        {currentStep === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Additional Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Founded Date
              </Typography>
              <DatePicker
                selected={formData.founded_date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
              />
            </Box>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button disabled={currentStep === 0 || loading} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={loading}>
          {loading ? "Saving..." : currentStep === steps.length - 1 ? "Complete" : "Next"}
        </Button>
      </Box>
    </Box>
  )
}

export default MultiStepForm
