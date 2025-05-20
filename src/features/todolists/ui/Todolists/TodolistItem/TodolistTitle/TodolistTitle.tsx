import { EditableSpan } from "@/common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/app/hooks.ts"
import {
  removeTodolistTC,
  TodolistDomainType,
  updateTodolistTitleTC,
} from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(todolist.id))
  }

  const changeTodolistTitleEditableSpanCallBack = (title: string) => {
    dispatch(updateTodolistTitleTC({ todolistId: todolist.id, title }))
  }
  return (
    <h3>
      <EditableSpan disabled={todolist.entityStatus === "loading"} title={todolist.title} changeTitle={changeTodolistTitleEditableSpanCallBack} />
      <IconButton disabled={todolist.entityStatus === "loading"} onClick={removeTodolistHandler} aria-label="delete" size={"large"} color={"error"}>
        <DeleteIcon />
      </IconButton>
    </h3>
  )
}
