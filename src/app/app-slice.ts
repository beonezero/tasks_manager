import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeModeType,
    status: "idle" as RequestStatus,
    error: null as string | null,
  },
  reducers: (creators) => ({
    changeThemeMode: creators.reducer<{themeMode: ThemeModeType}>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    changeAppStatus: creators.reducer<{status: RequestStatus}>((state, action) => {
       state.status = action.payload.status
    }),
    setError: creators.reducer<{error: string | null}>((state, action) => {
      state.error = action.payload.error
    })
  }),
  selectors: {
    selectTheme: state => state.themeMode,
    selectStatus: state => state.status,
    selectError: state => state.error,
  }
})

export const appReducer = appSlice.reducer

export const {changeThemeMode, changeAppStatus, setError} = appSlice.actions

export const {selectTheme, selectStatus, selectError} = appSlice.selectors

//types
export type ThemeModeType = "light" | "dark"

export type RequestStatus = "idle" | "loading" | "succeeded" | "filed"
