import { EditableSpan } from "@/common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistMutation
} from "@/features/todolists/api/todolistsApi.ts"
import { TodolistDomainType } from "@/features/todolists/api/todolistsApi.types.ts"
import { useAppDispatch } from "@/app/hooks.ts"
import { RequestStatus } from "@/app/app-slice.ts"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistMutation()

  const dispatch = useAppDispatch()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
      const findTodolist= state.find((el) => el.id === todolist.id)
      if (findTodolist) {
        findTodolist.entityStatus = status
      }
    }))
  }

  const removeTodolistHandler = () => {
    updateQueryData("loading")
    removeTodolist(todolist.id)
      .unwrap()
      .catch(() => {
        debugger
        updateQueryData("idle")
      })
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
