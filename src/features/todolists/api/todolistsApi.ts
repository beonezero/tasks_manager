import type { Todolist } from "./todolistsApi.types.ts"
import { instance } from "@/common/instance/instance.ts"
import { BaseResponse } from "@/common/types"

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<Todolist[]>("todo-lists")
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponse<{item: Todolist}>>("todo-lists", { title })
  },
  removeTodolist: (todolistId: string) => {
    return instance.delete<BaseResponse>(`todo-lists/{${todolistId}}`)
  },
  updateTodolist: (payload: { todolistId: string; title: string }) => {
    const { todolistId, title } = payload
    return instance.put<BaseResponse>(`todo-lists/{${todolistId}}`, { title })
  },
}
