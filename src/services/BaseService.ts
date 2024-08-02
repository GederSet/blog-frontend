import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { parseCookies } from 'nookies'

const baseUrl = 'http://localhost:8000'

export const baseApi = createApi({
  tagTypes: ['User', 'Post', 'File', 'Comment'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const { _token } = parseCookies()
      if (_token) {
        headers.set('Authorization', `Bearer ${_token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})
