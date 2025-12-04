import axios from "axios"
import store from "../store"
import { setToken, setUser, logout } from "../store/slices/authSlice"

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const state = store.getState()
    if (state.auth.token) {
      config.headers.Authorization = `Bearer ${state.auth.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  },
)

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData)
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials)
  if (response.data.data.token) {
    store.dispatch(setToken(response.data.data.token))
    store.dispatch(setUser(response.data.data.user))
  }
  return response.data
}

export const verifyEmail = async (token) => {
  const response = await api.get(`/auth/verify-email?token=${token}`)
  return response.data
}

export const verifyMobile = async (userId, otp) => {
  const response = await api.post("/auth/verify-mobile", { userId, otp })
  return response.data
}

export default api
