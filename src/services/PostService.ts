import { ClientPostType, ServerPostType } from '../redux/post/types'
import { baseApi } from './BaseService'

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<ServerPostType[], void>({
      query: () => ({
        url: '/posts',
      }),
      providesTags: (result) => ['Post'],
    }),
    getPost: builder.query<ServerPostType, string>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
      providesTags: (result) => ['Post'],
    }),
    getLatestTags: builder.query<string[], number>({
      query: (limit) => ({
        url: `/posts/${limit}/lastTags`,
      }),
      providesTags: (result) => ['Post'],
    }),
    createPost: builder.mutation<ServerPostType, ClientPostType>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<ServerPostType, ClientPostType>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    increaseViewCount: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}/views`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation<ServerPostType, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
  overrideExisting: true,
})
