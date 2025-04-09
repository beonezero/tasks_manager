import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "@/common/components"
import Switch from "@mui/material/Switch"
import { changeThemeMode } from "@/app/app-reducer.ts"
import { useAppDispatch, useAppSelector } from "@/app/hooks.ts"
import { selectStatus, selectTheme } from "@/app/app-selectors.ts"
import LinearProgress from '@mui/material/LinearProgress';
import { NavLink } from "react-router"

export const Header = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const themeMode = useAppSelector(selectTheme)

  const changeThemeModeHandler = () => {
    dispatch(changeThemeMode(themeMode === "light" ? "dark" : "light"))
  }

  // const theme = useTheme()
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" end>
              Todolists
            </NavLink>
          </Typography>
          <Switch color={"default"} onChange={changeThemeModeHandler} />
          <MenuButton color="inherit">
            <NavLink to="/login" end>
              Login
            </NavLink>
          </MenuButton>
          <MenuButton color="inherit">Logout</MenuButton>
          <MenuButton color="inherit">faq</MenuButton>
        </Toolbar>
        {status === "loading" ? <LinearProgress color="secondary"/> : <></>}
      </AppBar>
    </Box>
  )
}
