import { UserType } from '../redux/auth/types'
import { PostType } from '../redux/post/types'

export type ServerCommentType = {
  id?: number
  comment?: string
  createdAt?: string
  user?: UserType
  post?: PostType
  isFullComment?: boolean
  isNull?: boolean
  isLoading?: boolean
}

export type ClientCommentType = {
  comment: string
  postId: string
}
