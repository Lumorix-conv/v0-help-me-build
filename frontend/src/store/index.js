import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import companyReducer from "./slices/companySlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  },
})

export default store
