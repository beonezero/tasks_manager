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

