import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem.tsx"
import { useAppDispatch, useAppSelector } from "@/app/hooks.ts"
import { selectTodolists } from "../../model/todolists-selectors.ts"
import { useEffect } from "react"
import { fetchTodolistsTC } from "@/features/todolists/model/todolists-slice.ts"

export const Todolists = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((el) => (
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
