import { ErrorSnackbar, Header } from "@/common/components"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useAppSelector } from "./hooks.ts"
import { createThemeMode } from "../common/theme/theme.ts"
import { selectTheme } from "./app-selectors.ts"
import { Routing } from "@/common/routing"
import { useEffect } from "react"
import { authApi } from "@/features/auth/api/authApi.ts"

export const App = () => {
  const themeMode = useAppSelector(selectTheme)
  const theme = createThemeMode(themeMode)

  useEffect(() => {
    authApi.authMe()
      .then((res) => {
        console.log(res.data)})
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
