import { createSlice } from '@reduxjs/toolkit'
import { PostState, PostStatus } from './types'

const initialState: PostState = {
  items: [],
  status: PostStatus.LOADING,
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
})

export default postSlice.reducer
