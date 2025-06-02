import type { Todolist, TodolistDomainType } from "./todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getTodolists: build.query<TodolistDomainType[], void>({
        query: () => {
          return {
            url: "todo-lists",
            method: "GET",
          }
        },
        providesTags: ["Todolist"],
        transformResponse(todolists: Todolist[]): TodolistDomainType[] {
          return todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }))
        },
      }),
      addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            url: "todo-lists",
            method: "POST",
            body: { title },
          }
        },
        invalidatesTags: ["Todolist"],
      }),
      removeTodolist: build.mutation<BaseResponse, string>({
        query: (todolistId) => {
          return {
            url: `todo-lists/{${todolistId}}`,
            method: "DELETE",
          }
        },
        invalidatesTags: ["Todolist"],
      }),
      updateTodolist: build.mutation<BaseResponse, { todolistId: string; title: string }>({
        query: ({ todolistId, title }) => {
          return {
            url: `todo-lists/{${todolistId}}`,
            method: "PUT",
            body: { title },
          }
        },
        invalidatesTags: ["Todolist"],
      }),
    }
  },
})

// 7
export const { useGetTodolistsQuery, useAddTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistMutation } =
  todolistsApi