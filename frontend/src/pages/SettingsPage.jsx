"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Paper, TextField, Button, Typography, Box, Alert, Tabs, Tab, Grid } from "@mui/material"
import { useForm } from "react-hook-form"
import "react-datepicker/dist/react-datepicker.css"
import { toast } from "react-toastify"
import Header from "../components/Header"
import ImageUploader from "../components/ImageUploader"
import { updateCompanyProfile, uploadLogo, uploadBanner } from "../api/companyService"
import { setProfile } from "../store/slices/companySlice"

const SettingsPage = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.company)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [logoPreview, setLogoPreview] = useState(profile?.logo_url)
  const [bannerPreview, setBannerPreview] = useState(profile?.banner_url)
  const [logoLoading, setLogoLoading] = useState(false)
  const [bannerLoading, setBannerLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: profile || {},
  })

  useEffect(() => {
    if (profile) {
      Object.keys(profile).forEach((key) => {
        if (key !== "founded_date") {
          setValue(key, profile[key])
        }
      })
    }
  }, [profile, setValue])

  const onSubmitCompanyProfile = async (data) => {
    setLoading(true)
    setError(null)

    try {
      const response = await updateCompanyProfile(data)
      if (response.success) {
        dispatch(setProfile(response.data))
        toast.success("Company profile updated successfully!")
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update profile"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (file) => {
    if (!file) {
      setLogoPreview(null)
      return
    }

    setLogoLoading(true)
    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const response = await uploadLogo(file)
          if (response.success) {
            setLogoPreview(response.data.logo_url)
            dispatch(setProfile(response.data.company))
            toast.success("Logo uploaded successfully!")
          }
        } catch (err) {
          toast.error("Failed to upload logo")
        } finally {
          setLogoLoading(false)
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setLogoLoading(false)
      toast.error("Failed to upload logo")
    }
  }

  const handleBannerUpload = async (file) => {
    if (!file) {
      setBannerPreview(null)
      return
    }

    setBannerLoading(true)
    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const response = await uploadBanner(file)
          if (response.success) {
            setBannerPreview(response.data.banner_url)
            dispatch(setProfile(response.data.company))
            toast.success("Banner uploaded successfully!")
          }
        } catch (err) {
          toast.error("Failed to upload banner")
        } finally {
          setBannerLoading(false)
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setBannerLoading(false)
      toast.error("Failed to upload banner")
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Settings
        </Typography>

        <Paper>
          <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)}>
            <Tab label="Company Profile" />
            <Tab label="Media" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {tabValue === 0 && (
              <form onSubmit={handleSubmit(onSubmitCompanyProfile)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      {...register("company_name", { required: "Company name is required" })}
                      error={!!errors.company_name}
                      helperText={errors.company_name?.message}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Industry"
                      {...register("industry", { required: "Industry is required" })}
                      error={!!errors.industry}
                      helperText={errors.industry?.message}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("address", { required: "Address is required" })}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="City"
                      {...register("city", { required: "City is required" })}
                      error={!!errors.city}
                      helperText={errors.city?.message}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="State"
                      {...register("state", { required: "State is required" })}
                      error={!!errors.state}
                      helperText={errors.state?.message}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      {...register("country", { required: "Country is required" })}
                      error={!!errors.country}
                      helperText={errors.country?.message}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Postal Code"
                      {...register("postal_code", { required: "Postal code is required" })}
                      error={!!errors.postal_code}
                      helperText={errors.postal_code?.message}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField fullWidth label="Website" {...register("website")} margin="normal" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      {...register("description")}
                      margin="normal"
                      multiline
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" type="submit" disabled={loading} sx={{ mt: 2 }}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}

            {tabValue === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ImageUploader
                    label="Company Logo"
                    onUpload={handleLogoUpload}
                    preview={logoPreview}
                    isLoading={logoLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <ImageUploader
                    label="Company Banner"
                    onUpload={handleBannerUpload}
                    preview={bannerPreview}
                    isLoading={bannerLoading}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default SettingsPage
