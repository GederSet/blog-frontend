import { ClientCommentType, ServerCommentType } from '../@types/commentTypes'
import { baseApi } from './BaseService'

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostComments: builder.query<ServerCommentType[], string>({
      query: (postId) => ({
        url: `/comments/${postId}`,
      }),
      providesTags: (result) => ['Comment'],
    }),
    getLatestComments: builder.query<ServerCommentType[], number>({
      query: (count) => ({
        url: `/comments/${count}/latest`,
      }),
      providesTags: (result) => ['Comment'],
    }),
    createComment: builder.mutation<ServerCommentType, ClientCommentType>({
      query: (comment) => ({
        url: '/comments',
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['Comment', 'Post'],
    }),
  }),
  overrideExisting: true,
})
