import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"

export const Todolists = () => {

  const { data: todolists } = useGetTodolistsQuery()

  console.log(useGetTodolistsQuery())

  return (
    <>
      {todolists?.map((el) => (
        <Grid key={el.id}>
          <Paper
            elevation={12}
            sx={{
              padding: 2,
              borderRadius: 3,
              height: "fit-content",
            }}
          >
            <TodolistItem todolist={el} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
