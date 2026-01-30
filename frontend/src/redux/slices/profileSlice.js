import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getUserProfile, updateUserProfile} from '../../api/usersApi'

export const fetchMyProfile = createAsyncThunk(
  'profile/me',
  async (_, {rejectWithValue}) => {
    try {
      const res = await getUserProfile('me')
      return res.data
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Error')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (formData, {rejectWithValue}) => {
    try {
      const res = await updateUserProfile(formData)
      return res.data
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Error')
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
   }
})

export default profileSlice.reducer
