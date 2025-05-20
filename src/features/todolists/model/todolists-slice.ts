import { Todolist } from "../api/todolistsApi.types.ts"
import { AppDispatch, AppThunk } from "@/app/store.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { changeAppStatus, RequestStatus, setError } from "@/app/app-slice.ts"
import { ResultCode } from "@/features/todolists/libs/enums.ts"
import { handleAppError, handleServerError } from "@/common/utils"
import { createSlice } from "@reduxjs/toolkit"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: (creators) => ({
    removeTodolist: creators.reducer<{ todolistId: string }>((state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.todolistId)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: creators.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({
        ...action.payload.todolist,
        filter: "All",
        entityStatus: "idle",
      })
    }),
    changeTodolistFilter: creators.reducer<{ todolistId: string; filter: FilterValue }>((state, action) => {
      const todolist = state.find((el) => el.id === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    changeTodolistTitle: creators.reducer<{ todolistId: string; title: string }>((state, action) => {
      const todolist = state.find((el) => el.id === action.payload.todolistId)
      if (todolist) {
        todolist.title = action.payload.title
      }
    }),
    setTodolists: creators.reducer<{todolists: Todolist[]}>((state, action) => {
      action.payload.todolists.forEach(el => {
        state.push({...el, filter: "All", entityStatus: "idle"})
      })
    }),
    changeTodolistEntityStatus: creators.reducer<{ todolistId: string, entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find(el => {
        return el.id === action.payload.todolistId
      })
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),

    clearTodolists: creators.reducer(() => {
      return []
    }),
  }),
})

export const todolistsReducer = todolistsSlice.reducer

export const {addTodolist, setTodolists, changeTodolistFilter, changeTodolistTitle, clearTodolists, removeTodolist, changeTodolistEntityStatus} = todolistsSlice.actions

//thunks

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(changeAppStatus({ status: "loading" }))
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolists({todolists: res.data}))
    dispatch(changeAppStatus({ status: "succeeded" }))
  })
}

export const removeTodolistTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(changeAppStatus({ status: "loading" }))
    dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "loading" }))
    todolistsApi
      .removeTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTodolist({todolistId}))
        } else {
          dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "filed" }))
          dispatch(setError({ error: res.data.messages.length ? res.data.messages[0] : "Some error..." }))
        }
        dispatch(changeAppStatus({ status: "succeeded" }))
      })
      .catch((error) => {
        handleServerError({ dispatch, error })
        dispatch(changeTodolistEntityStatus({ todolistId, entityStatus: "filed" }))
      })
  }

export const createTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(changeAppStatus({ status: "loading" }))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolist({todolist: res.data.data.item}))
          dispatch(changeAppStatus({ status: "succeeded" }))
        } else {
          handleAppError<{ item: Todolist }>({ dispatch, data: res.data })
        }
      })
      .catch((error) => {
        handleServerError({ dispatch, error })
      })
  }

export const updateTodolistTitleTC =
  (payload: { todolistId: string; title: string }): AppThunk =>
  (dispatch) => {
    dispatch(changeAppStatus({ status: "loading" }))
    todolistsApi.updateTodolist(payload).then(() => {
      dispatch(changeTodolistTitle(payload))
      dispatch(changeAppStatus({ status: "succeeded" }))
    })
  }

//Types

export type TodolistDomainType = Todolist & { filter: FilterValue; entityStatus: RequestStatus }

type FilterValue = "All" | "Active" | "Completed"
