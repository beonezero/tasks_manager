import { ErrorSnackbar, Header } from "@/common/components"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { useAppDispatch, useAppSelector } from "./hooks.ts"
import { createThemeMode } from "../common/theme/theme.ts"
import { Routing } from "@/common/routing"
import { useEffect, useState } from "react"
import s from "@/app/App.module.css"
import { selectTheme, setIsLoggedIn } from "@/app/app-slice.ts"
import { useAuthMeQuery } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/features/todolists/libs/enums.ts"

export const App = () => {
  const themeMode = useAppSelector(selectTheme)
  const theme = createThemeMode(themeMode)

  const dispatch = useAppDispatch()

  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const {data, isLoading} = useAuthMeQuery()

  useEffect(() => {
    if (!isLoading) {
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({isLoggedIn: true}))
      }
      setIsInitialized(true)
    }
  }, [isLoading])

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
