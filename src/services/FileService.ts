import { ServerFileType } from '../@types/fileTypes'
import { baseApi } from './BaseService'

export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<ServerFileType, FormData>({
      query: (file) => ({
        url: '/files',
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['File'],
    }),
  }),
  overrideExisting: true,
})
