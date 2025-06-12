import List from "@mui/material/List"
import { Task as TaskType } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/features/todolists/libs/enums.ts"
import { Task } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/Task.tsx"
import { TodolistDomainType } from "@/features/todolists/api/todolistsApi.types.ts"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/skeletons/TasksSkeleton/TasksSkeleton.tsx"

type Props = {
  todolist: TodolistDomainType
}
export const Tasks = ({ todolist }: Props) => {
  const { data, isLoading } = useGetTasksQuery(todolist.id)

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

  const tasks = data?.items || []
  const tasksForTodolist = currentTasksBlock(tasks)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <List>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        tasksForTodolist?.map((task) => {
          return <Task key={task.id} task={task} />
        })
      )}
    </List>
  )
}
