import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  isEmailVerified: false,
  isMobileVerified: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
      if (action.payload) {
        localStorage.setItem("token", action.payload)
      } else {
        localStorage.removeItem("token")
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setEmailVerified: (state, action) => {
      state.isEmailVerified = action.payload
    },
    setMobileVerified: (state, action) => {
      state.isMobileVerified = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isEmailVerified = false
      state.isMobileVerified = false
      localStorage.removeItem("token")
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setUser, setToken, setLoading, setError, setEmailVerified, setMobileVerified, logout, clearError } =
  authSlice.actions

export default authSlice.reducer
