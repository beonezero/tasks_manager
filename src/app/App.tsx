import { ErrorSnackbar, Header } from "@/common/components"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { useAppDispatch, useAppSelector } from "./hooks.ts"
import { createThemeMode } from "../common/theme/theme.ts"
import { selectTheme } from "./app-selectors.ts"
import { Routing } from "@/common/routing"
import { useEffect } from "react"
import { authMeTC } from "@/features/auth/model/auth-slice.ts"
import s from "@/app/App.module.css"
import { selectIsInitialized } from "@/features/auth/model/auth-selectors.ts"

export const App = () => {
  const themeMode = useAppSelector(selectTheme)
  const theme = createThemeMode(themeMode)
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
