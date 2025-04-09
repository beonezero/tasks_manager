import Grid from "@mui/material/Grid2"
import { AddItemForm } from "@/common/components"
import Container from "@mui/material/Container"
import { useAppDispatch } from "./hooks.ts"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists.tsx"
import { createTodolistTC } from "@/features/todolists/model/todolists-reducer.ts"

export const Main = () => {
  const dispatch = useAppDispatch()
  const addTodolistApp = (title: string) => {
    dispatch(createTodolistTC(title))
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
