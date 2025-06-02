import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "@/common/components"
import Switch from "@mui/material/Switch"
import {
  changeThemeMode,
  selectIsLoggedIn,
  selectStatus,
  selectTheme,
  setIsLoggedIn
} from "@/app/app-slice.ts"
import { useAppDispatch, useAppSelector } from "@/app/hooks.ts"
import LinearProgress from "@mui/material/LinearProgress"
import { useLogOutMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/features/todolists/libs/enums.ts"

export const Header = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const themeMode = useAppSelector(selectTheme)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [logout] = useLogOutMutation()

  const changeThemeModeHandler = () => {
    dispatch(changeThemeMode(themeMode === "light" ? {themeMode: "dark"} : {themeMode: "light"}))
  }

  const onClickLogoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({isLoggedIn: false}))
        localStorage.removeItem("auth-token")
      }
    })
  }

  // const theme = useTheme()
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <Switch color={"default"} onChange={changeThemeModeHandler} />
          {isLoggedIn && (
            <MenuButton onClick={onClickLogoutHandler} color="inherit">
              Logout
            </MenuButton>
          )}
          <MenuButton color="inherit">faq</MenuButton>
        </Toolbar>
        {status === "loading" ? <LinearProgress color="secondary" /> : <></>}
      </AppBar>
    </Box>
  )
}
