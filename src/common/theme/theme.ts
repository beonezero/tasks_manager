import { createTheme } from "@mui/material"
import { ThemeModeType } from "@/app/app-reducer.ts"

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
