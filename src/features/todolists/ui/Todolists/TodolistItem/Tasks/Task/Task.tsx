import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { removeTaskTC, updateTaskStatusTC, updateTaskTitleTC } from "../../../../../model/tasks-slice.ts"
import { useAppDispatch, useAppSelector } from "@/app/hooks.ts"
import { getTaskSx } from "./Task.styles.ts"
import { EditableSpan } from "@/common/components"
import { Task as TaskType } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/features/todolists/libs/enums.ts"

type Props = {
  todolistId: string
  task: TaskType
}

export const Task = ({ todolistId, task }: Props) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.status)

  const changeTaskTitleEditableSpanCallBack = (title: string) => {
    dispatch(updateTaskTitleTC({ task, title }))
  }

  const onChangeCheckBoxHandler = (isDone: boolean) => {
    dispatch(updateTaskStatusTC({ task, status: isDone ? TaskStatus.Completed : TaskStatus.New }))
  }

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ todolistId, taskId: task.id }))
  }

  return (
    <ListItem sx={getTaskSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          onChange={(e) => onChangeCheckBoxHandler(e.currentTarget.checked)}
          checked={task.status === TaskStatus.Completed}
          defaultChecked
          color="success"
        />
        <EditableSpan disabled={isLoading === "loading"} title={task.title} changeTitle={changeTaskTitleEditableSpanCallBack} />
      </div>
      <IconButton onClick={removeTaskHandler} aria-label="delete" size={"small"}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
