import { UserType } from '../auth/types'

export type PostType = {
  id: number
  title: string
  text: string
  tags: string[]
  viewsCount: number
  fileName: string
  originalFile: string
  createdAt: string
}

export type ServerPostType = {
  id: number
  title: string
  text: string
  tags: string[]
  viewsCount: number
  fileName: string
  originalFile: string
  createdAt: string
  commentsCount: number
  user: UserType
  isEditTable: boolean
  isFullPost?: boolean
  children?: React.ReactNode
}

export type ClientPostType = {
  id?: string
  title: string
  text: string
  tags: string
  fileName: string
  originalFile: string
}

export enum PostStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
}

export interface PostState {
  items: ServerPostType[]
  status: PostStatus
}
