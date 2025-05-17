export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export type AuthMeDate = {
  id: number
  login: string
  email: string
}