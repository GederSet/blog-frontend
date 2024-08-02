import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../../services/UserService'
import { UserSliceState } from './types'

const initialState: UserSliceState = {
  user: {
    id: 0,
    login: '',
    password: '',
    imageUrl: '',
    originalUrl: '',
  },
  token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        id: 0,
        login: '',
        password: '',
        imageUrl: '',
        originalUrl: '',
      }
      state.token = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user
          state.token = payload.token
        }
      )
      .addMatcher(
        userApi.endpoints.registerUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user
          state.token = payload.token
        }
      )
      .addMatcher(
        userApi.endpoints.getMe.matchFulfilled,
        (state, { payload }) => {
          state.user = payload
        }
      )
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
