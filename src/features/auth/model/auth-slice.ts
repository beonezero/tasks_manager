import { LoginArgs } from "@/features/auth/api/authApi.types.ts"
import { changeAppStatus, setError } from "@/app/app-reducer.ts"
import { AppDispatch } from "@/app/store.ts"
import { authApi } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/features/todolists/libs/enums.ts"
import { handleServerError } from "@/common/utils"
import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false
  },
  reducers: (creators) => ({
    setIsLoggedIn: creators.reducer<{isLoggedIn: boolean}>((state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: creators.reducer<{isInitialized: boolean}>((state, action) => {
        state.isInitialized = action.payload.isInitialized
    })
  })
})

export const {setIsLoggedIn, setIsInitialized} = authSlice.actions

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(changeAppStatus("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({isLoggedIn: true}))
        dispatch(changeAppStatus("succeeded"))
        localStorage.setItem("auth-token", res.data.data.token)
      } else {
        dispatch(setError(res.data.messages[0]))
        dispatch(changeAppStatus("filed"))
      }
    })
    .catch((error) => {
      handleServerError({ dispatch, error })
      dispatch(changeAppStatus("filed"))
    })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(changeAppStatus("loading"))
  authApi.logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({isLoggedIn: false}))
        localStorage.removeItem("auth-token")
        dispatch(changeAppStatus("succeeded"))
      } else {
        dispatch(setError(res.data.messages[0]))
        dispatch(changeAppStatus("filed"))
      }

    })
    .catch((error) => {
      handleServerError({ dispatch, error })
      dispatch(changeAppStatus("filed"))
    })
}

export const authMeTC = () => (dispatch: AppDispatch) => {
  dispatch(changeAppStatus("loading"))
  authApi.authMe()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        console.log(res.data)
        dispatch(setIsLoggedIn({isLoggedIn: true}))
        dispatch(changeAppStatus("succeeded"))
      } else {
        dispatch(setError(res.data.messages[0]))
        dispatch(changeAppStatus("filed"))
      }
    })
    .catch((error) => {
      handleServerError({ dispatch, error })
      dispatch(changeAppStatus("filed"))
    })
    .finally(() => {
      dispatch(setIsInitialized({isInitialized: true}))
    })
}