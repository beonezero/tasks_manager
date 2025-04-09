import { instance } from "@/common/instance/instance.ts"
import { GetTasksResponse, Task, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { BaseResponse } from "@/common/types"

export const tasksApi = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask: (payload: { todolistId: string; title: string }) => {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask: (payload: { todolistId: string; taskId: string }) => {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask: (payload: { todolistId: string; taskId: string; updateTaskModel: UpdateTaskModel }) => {
    const { todolistId, taskId, updateTaskModel } = payload
    return instance.put<
      BaseResponse<{
        item: Task
      }>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, updateTaskModel)
  },
}
