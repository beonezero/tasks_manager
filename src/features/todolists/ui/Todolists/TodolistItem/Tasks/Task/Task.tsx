import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { useAppSelector } from "@/app/hooks.ts"
import { getTaskSx } from "./Task.styles.ts"
import { EditableSpan } from "@/common/components"
import { Task as TaskType } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/features/todolists/libs/enums.ts"
import { selectStatus } from "@/app/app-slice.ts"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  task: TaskType
}

export const Task = ({ task }: Props) => {
  const isLoading = useAppSelector(selectStatus)

  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const {deadline, description, priority, status, startDate, todoListId, id, title} = task

  const updateTaskModel = {
    title,
    deadline,
    description,
    priority,
    startDate,
    status,
  }

  const changeTaskTitleEditableSpanCallBack = (title: string) => {
    updateTaskModel.title = title
    updateTask({todolistId: todoListId, taskId: id, updateTaskModel})
  }

  const onChangeCheckBoxHandler = (isDone: boolean) => {
    updateTaskModel.status = isDone ? TaskStatus.Completed : TaskStatus.New
    updateTask({todolistId: todoListId, taskId: id, updateTaskModel})
  }

  const removeTaskHandler = () => {
    removeTask({ todolistId: todoListId, taskId: task.id })
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
