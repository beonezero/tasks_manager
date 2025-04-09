import { TaskPriority } from "@/features/todolists/libs/enums.ts"

export type Task = {
  description: string | null
  title: string
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type Tasks = {
  [key: string]: Task[]
}

export type GetTasksResponse = {
  items: Task[]
  totalCount: number
  error: string | null
}

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: number
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
