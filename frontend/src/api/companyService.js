import api from "./authService"

export const registerCompanyProfile = async (companyData) => {
  const response = await api.post("/company/register", companyData)
  return response.data
}

export const getCompanyProfile = async () => {
  const response = await api.get("/company/profile")
  return response.data
}

export const updateCompanyProfile = async (companyData) => {
  const response = await api.put("/company/profile", companyData)
  return response.data
}

export const uploadLogo = async (file) => {
  const formData = new FormData()
  formData.append("file", file)
  const response = await api.post("/company/upload-logo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response.data
}

export const uploadBanner = async (file) => {
  const formData = new FormData()
  formData.append("file", file)
  const response = await api.post("/company/upload-banner", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response.data
}
