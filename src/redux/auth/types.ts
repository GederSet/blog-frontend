export type UserType = {
  id: number
  login: string
  password: string
  imageUrl: string
  originalUrl: string
}

export interface UserSliceState {
  user: UserType
  token: string
}
