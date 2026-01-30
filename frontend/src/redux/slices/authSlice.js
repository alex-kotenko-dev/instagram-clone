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
  loading: false,
  error: null,
  isAuth: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuth = false
      localStorage.removeItem('token')
    },

    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuth = true
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
      state.isAuth = true
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
      state.isAuth = true
      localStorage.setItem('token', action.payload.token)
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const {logout, setCredentials} = authSlice.actions
export default authSlice.reducer