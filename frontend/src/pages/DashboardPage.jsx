"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Container, Paper, Typography, Box, Button, Grid, Card, CardContent, Chip } from "@mui/material"
import { toast } from "react-toastify"
import Header from "../components/Header"
import MultiStepForm from "../components/MultiStepForm"
import { getCompanyProfile } from "../api/companyService"
import { setProfile } from "../store/slices/companySlice"

const DashboardPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profile } = useSelector((state) => state.company)
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await getCompanyProfile()
        if (response.success && response.data) {
          dispatch(setProfile(response.data))
          setShowForm(false)
        } else {
          setShowForm(true)
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setShowForm(true)
        } else {
          toast.error("Failed to load company profile")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyProfile()
  }, [dispatch])

  const handleFormComplete = () => {
    setShowForm(false)
    const fetchCompanyProfile = async () => {
      try {
        const response = await getCompanyProfile()
        if (response.success) {
          dispatch(setProfile(response.data))
        }
      } catch (error) {
        toast.error("Failed to load company profile")
      }
    }
    fetchCompanyProfile()
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: "var(--space-8)" }}>
        <Box sx={{ mb: "var(--space-8)" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "var(--text-primary)",
              mb: "var(--space-2)",
            }}
          >
            Welcome back, {user?.full_name}!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--text-secondary)",
              fontSize: "var(--text-base)",
            }}
          >
            Manage your company profile and settings
          </Typography>
        </Box>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : showForm ? (
          <Paper
            sx={{
              p: "var(--space-8)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--border)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: "var(--space-6)",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Complete Your Company Profile
            </Typography>
            <MultiStepForm onComplete={handleFormComplete} />
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {/* User Profile Card */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: "var(--space-6)",
                  borderRadius: "var(--radius-2xl)",
                  border: "1px solid var(--border)",
                  transition: "all var(--transition-base)",
                  "&:hover": {
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    borderColor: "var(--primary)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: "var(--space-4)",
                    color: "var(--text-primary)",
                  }}
                >
                  User Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Name:</strong> {user?.full_name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {user?.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mobile:</strong> {user?.mobile_no}
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Chip label="Email Verified" color={user?.is_email_verified ? "success" : "default"} size="small" />
                    <Chip
                      label="Mobile Verified"
                      color={user?.is_mobile_verified ? "success" : "default"}
                      size="small"
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Company Profile Card */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: "var(--space-6)",
                  borderRadius: "var(--radius-2xl)",
                  border: "1px solid var(--border)",
                  transition: "all var(--transition-base)",
                  "&:hover": {
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    borderColor: "var(--secondary)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: "var(--space-4)",
                    color: "var(--text-primary)",
                  }}
                >
                  Company Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Company:</strong> {profile?.company_name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Industry:</strong> {profile?.industry}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong> {profile?.city}, {profile?.state}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Website:</strong>{" "}
                    {profile?.website ? (
                      <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        {profile.website}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate("/settings")}
                    sx={{ mt: 2, alignSelf: "flex-start" }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Company Images */}
            {(profile?.logo_url || profile?.banner_url) && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Company Media
                    </Typography>
                    <Grid container spacing={2}>
                      {profile?.logo_url && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            Logo
                          </Typography>
                          <Box
                            component="img"
                            src={profile.logo_url}
                            alt="Company Logo"
                            sx={{
                              maxWidth: "100%",
                              maxHeight: 200,
                              borderRadius: 1,
                              objectFit: "contain",
                            }}
                          />
                        </Grid>
                      )}
                      {profile?.banner_url && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            Banner
                          </Typography>
                          <Box
                            component="img"
                            src={profile.banner_url}
                            alt="Company Banner"
                            sx={{
                              maxWidth: "100%",
                              maxHeight: 200,
                              borderRadius: 1,
                              objectFit: "cover",
                            }}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </>
  )
}

export default DashboardPage
