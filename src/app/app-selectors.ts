import { RootState } from "./store.ts"
import { RequestStatus, ThemeModeType } from "./app-reducer.ts"

export const selectTheme = (state: RootState): ThemeModeType => state.app.themeMode

export const selectStatus = (state: RootState): RequestStatus => state.app.status

export const selectError = (state: RootState): string | null => state.app.error
