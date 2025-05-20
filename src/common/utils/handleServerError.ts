import { changeAppStatus, setError } from "@/app/app-slice.ts"
import { AppDispatch } from "@/app/store.ts"

export const handleServerError = (args: {dispatch: AppDispatch, error: {message: string}}) => {
  const {dispatch, error} = args
  dispatch(setError(error.message))
  dispatch(changeAppStatus("filed"))
}