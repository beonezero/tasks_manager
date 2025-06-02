import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { containerButtonsFiltersSx } from "./FilterButtons.styles.ts"
import { useAppDispatch } from "@/app/hooks.ts"
import { FilterValue, TodolistDomainType } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: TodolistDomainType
}

export const FilterButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const changeFilterHandler = (filter: FilterValue) => {
    dispatch(todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
      const findTodolist= state.find((el) => el.id === todolist.id)
      if (findTodolist) {
        findTodolist.filter = filter
      }
    }))
  }

  const styleButton = {
    fontWeight: 900,
  }
  return (
    <Box sx={containerButtonsFiltersSx}>
      <Button
        onClick={() => changeFilterHandler("All")}
        variant={todolist.filter === "All" ? "contained" : "outlined"}
        color="error"
        style={styleButton}
      >
        All
      </Button>

      <Button
        onClick={() => changeFilterHandler("Active")}
        variant={todolist.filter === "Active" ? "contained" : "outlined"}
        color="secondary"
        style={styleButton}
      >
        Active
      </Button>

      <Button
        onClick={() => changeFilterHandler("Completed")}
        variant={todolist.filter === "Completed" ? "contained" : "outlined"}
        color="success"
        style={styleButton}
      >
        Completed
      </Button>
    </Box>
  )
}
