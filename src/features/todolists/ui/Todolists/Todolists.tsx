import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"
import { TodolistSkeleton } from "@/features/todolists/ui/skeletons/TodolistSkeleton/TodolistSkeleton.tsx"

export const Todolists = () => {

  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

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
