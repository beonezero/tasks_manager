import { LoginArgs } from "@/features/auth/api/authApi.types.ts"
import { changeAppStatus, setError } from "@/app/app-reducer.ts"
import { AppDispatch } from "@/app/store.ts"
import { authApi } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/features/todolists/libs/enums.ts"
import { handleServerError } from "@/common/utils"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(changeAppStatus("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        console.log(res.data)
        dispatch(setIsLoggedInAC(true))
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

// new
