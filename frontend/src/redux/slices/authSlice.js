import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {registerUser, loginUser} from '../../api/authApi'


export const register = createAsyncThunk(
  'auth/register',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await registerUser(userData)
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Something went wrong"
      return rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await loginUser(userData)
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Something went wrong"
      return rejectWithValue(message)
    }
  }
)

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuth: false,
  authChecked: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuth = false
      state.authChecked = true
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },

    clearError: (state) => {
      state.error = null
    },

    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuth = true
      state.authChecked = true
    }
  },

  extraReducers: (builder) => {
    builder

    .addCase(register.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuth = true
      state.authChecked = true
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    
    .addCase(login.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuth = true
      state.authChecked = true  
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const {logout, clearError, setCredentials} = authSlice.actions
export default authSlice.reducer