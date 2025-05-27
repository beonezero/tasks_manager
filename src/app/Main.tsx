import Grid from "@mui/material/Grid2"
import { AddItemForm } from "@/common/components"
import Container from "@mui/material/Container"
import { useAppSelector } from "./hooks.ts"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists.tsx"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Path } from "@/common/routing"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { useAddTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"
export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  const addTodolistApp = (title: string) => {
    addTodolist(title)
  }

  return (
    <Container fixed sx={{ p: 3 }}>
      <Grid container sx={{ marginBottom: 3 }}>
        <AddItemForm buttonTitle={"+"} callback={addTodolistApp} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
