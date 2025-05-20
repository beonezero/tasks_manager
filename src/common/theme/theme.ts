import { createTheme } from "@mui/material"
import { ThemeModeType } from "@/app/app-slice.ts"

export const createThemeMode = (themeMode: ThemeModeType) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  })
}
