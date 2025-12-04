import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  profile: null,
  loading: false,
  error: null,
  currentStep: 1,
}

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    updateProfileField: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
      }
    },
  },
})

export const { setProfile, setLoading, setError, setCurrentStep, clearError, updateProfileField } = companySlice.actions

export default companySlice.reducer
