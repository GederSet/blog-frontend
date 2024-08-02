import { UserSliceState, UserType } from '../redux/auth/types'
import { baseApi } from './BaseService'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserType, Object>({
      query: () => ({
        url: '/users/me',
      }),
      providesTags: () => ['User'],
    }),
    loginUser: builder.mutation<UserSliceState, UserType>({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    registerUser: builder.mutation<UserSliceState, UserType>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
})
