import { EditableSpan } from "@/common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  TodolistDomainType,
} from "@/features/todolists/model/todolists-slice.ts"
import { useRemoveTodolistMutation, useUpdateTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistMutation()

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id)
  }

  const changeTodolistTitleEditableSpanCallBack = (title: string) => {
    updateTodolistTitle({ todolistId: todolist.id, title })
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
