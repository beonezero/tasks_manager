import { instance } from "@/common/instance/instance.ts"
import { AuthMeDate, LoginArgs } from "@/features/auth/api/authApi.types.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      authMe: build.query<BaseResponse<AuthMeDate>, void>({
        query: () => {
          return {
            url: "auth/me",
            method: "GET",
          }
        },
      }),
      login: build.mutation<BaseResponse<{userId: number, token: string}>, LoginArgs>({
        query: (arg) => {
          return {
            url: "auth/login",
            method: "POST",
            body: arg,
          }
        },
      }),
      logOut: build.mutation<BaseResponse, void>({
        query: () => {
          return {
            url: "auth/login",
            method: "DELETE",
          }
        },
      }),
    }
  }
})

export const {useLoginMutation, useAuthMeQuery, useLogOutMutation} = authApi

export const _authApi = {
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