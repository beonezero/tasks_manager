import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useAppDispatch } from "../../../../../../app/hooks.ts"
import { changeTodolistFilter, Todolist } from "../../../../model/todolists-slice.ts"
import { containerButtonsFiltersSx } from "./FilterButtons.styles.ts"

type Props = {
  todolist: Todolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const changeFilterAllHandler = () => {
    dispatch(changeTodolistFilter({ todolistId: todolist.id, filter: "All" }))
  }

  const changeFilterActiveHandler = () => {
    dispatch(changeTodolistFilter({ todolistId: todolist.id, filter: "Active" }))
  }

  const changeFilterCompletedHandler = () => {
    dispatch(changeTodolistFilter({ todolistId: todolist.id, filter: "Completed" }))
  }

  const styleButton = {
    fontWeight: 900,
  }
  return (
    <Box sx={containerButtonsFiltersSx}>
      <Button
        onClick={changeFilterAllHandler}
        variant={todolist.filter === "All" ? "contained" : "outlined"}
        color="error"
        style={styleButton}
      >
        All
      </Button>

      <Button
        onClick={changeFilterActiveHandler}
        variant={todolist.filter === "Active" ? "contained" : "outlined"}
        color="secondary"
        style={styleButton}
      >
        Active
      </Button>

      <Button
        onClick={changeFilterCompletedHandler}
        variant={todolist.filter === "Completed" ? "contained" : "outlined"}
        color="success"
        style={styleButton}
      >
        Completed
      </Button>
    </Box>
  )
}
