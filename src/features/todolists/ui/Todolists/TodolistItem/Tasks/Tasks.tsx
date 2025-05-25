import { useAppDispatch, useAppSelector } from "@/app/hooks.ts"
import List from "@mui/material/List"
import { TodolistDomainType } from "@/features/todolists/model/todolists-slice.ts"
import { useEffect } from "react"
import { Task as TaskType } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/features/todolists/libs/enums.ts"
import { Task } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/Task.tsx"
import { fetchTasksTC, selectTasks } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  todolist: TodolistDomainType
}
export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  const currentTasksBlock = (tasksForFilter: TaskType[]): TaskType[] => {
    switch (todolist.filter) {
      case "Completed": {
        return tasksForFilter.filter((task) => task.status === TaskStatus.Completed)
      }
      case "Active": {
        return tasksForFilter.filter((task) => task.status === TaskStatus.New)
      }
      default:
        return tasksForFilter
    }
  }

  const tasksForTodolist: TaskType[] = currentTasksBlock(tasks[todolist.id])

  return (
    <List>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        tasksForTodolist?.map((task) => {
          return <Task key={task.id} task={task} todolistId={todolist.id} />
        })
      )}
    </List>
  )
}
