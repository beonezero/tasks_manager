import { changeAppStatus, setError } from "@/app/app-slice.ts"
import { AppDispatch } from "@/app/store.ts"
import { BaseResponse } from "@/common/types"

export const handleAppError = <T>(args: {dispatch: AppDispatch, data: BaseResponse<T>}) => {
  const {dispatch, data} = args

  dispatch(setError(data.messages.length ? data.messages[0] : "Some error..."))
  dispatch(changeAppStatus("filed"))
}