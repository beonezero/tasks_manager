import { instance } from "@/common/instance/instance.ts"
import { AuthMeDate, LoginArgs } from "@/features/auth/api/authApi.types.ts"
import { BaseResponse } from "@/common/types"

export const authApi = {
  authMe () {
    return instance.get<BaseResponse<AuthMeDate>>("auth/me")
  },
  login (args: LoginArgs) {
    return instance.post<BaseResponse<{userId: number, token: string}>>("auth/login", args)
  },
  logout () {
    return instance.delete<BaseResponse>("auth/login")
  }
}