const initialState = {
  themeMode: "light" as ThemeModeType,
  status: "idle" as RequestStatus,
  error: null as string | null,
}

export const appReducer = (state: InitialAppType = initialState, action: ActionTypes): InitialAppType => {
  switch (action.type) {
    case "CHANGE_THEME_MODE": {
      return { ...state, themeMode: action.payload.themeMode }
    }
    case "SET_STATUS": {
      return { ...state, status: action.status }
    }
    case "SET_ERROR": {
      return { ...state, error: action.error }
    }
    default: {
      return state
    }
  }
}

//Actions

export const changeThemeMode = (themeMode: ThemeModeType) =>
  ({ type: "CHANGE_THEME_MODE", payload: { themeMode } }) as const

export const changeAppStatus = (status: RequestStatus) =>
  ({
    type: "SET_STATUS",
    status,
  }) as const

export const setError = (error: string | null) =>
  ({
    type: "SET_ERROR",
    error,
  }) as const

//types

export type InitialAppType = typeof initialState

export type ThemeModeType = "light" | "dark"

export type RequestStatus = "idle" | "loading" | "succeeded" | "filed"

export type ActionTypes = ChangeThemeMode | ChangeAppStatus | SetError

export type ChangeThemeMode = ReturnType<typeof changeThemeMode>
export type ChangeAppStatus = ReturnType<typeof changeAppStatus>
export type SetError = ReturnType<typeof setError>
