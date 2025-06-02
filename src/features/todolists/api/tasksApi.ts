import { instance } from "@/common/instance/instance.ts"
import { GetTasksResponse, Task, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => {
        return {
          url: `todo-lists/${todolistId}/tasks`,
          method: "GET",
        }
      },
      providesTags: ["Task"]
    }),
    createTask: build.mutation<BaseResponse<{ item: Task }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => {
        return {
          url: `todo-lists/${todolistId}/tasks`,
          method: "POST",
          body: { title },
        }
      },
      invalidatesTags: ["Task"]
    }),
    removeTask: build.mutation<BaseResponse<{ item: Task }>, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["Task"]
    }),
    updateTask: build.mutation<BaseResponse<{ item: Task }>, { todolistId: string; taskId: string; updateTaskModel: UpdateTaskModel }>({
      query: ({ todolistId, taskId, updateTaskModel }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: "PUT",
          body: updateTaskModel
        }
      },
      invalidatesTags: ["Task"]
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = taskApi

export const _tasksApi = {
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
