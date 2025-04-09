import { Todolist } from "../api/todolistsApi.types.ts"
import { AppDispatch, AppThunk } from "@/app/store.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { changeAppStatus, RequestStatus, setError } from "@/app/app-reducer.ts"
import { ResultCode } from "@/features/todolists/libs/enums.ts"
import { handleAppError, handleServerError } from "@/common/utils"

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: ActionTypes,
): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE_TODOLIST": {
      const { todolistId } = action.payload
      return state.filter((td) => {
        return td.id !== todolistId
      })
    }
    case "ADD_TODOLIST": {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "All", entityStatus: "idle" }
      return [newTodolist, ...state]
    }
    case "CHANGE_FILTER": {
      const { todolistId, filter } = action.payload
      return state.map((td) => (td.id === todolistId ? { ...td, filter } : td))
    }
    case "CHANGE_TODOLIST_TITLE": {
      const { todolistId, title } = action.payload
      return state.map((td) => (td.id === todolistId ? { ...td, title } : td))
    }
    case "SET_TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }))
    }
    case "SET_TODOLIST_ENTITY_STATUS": {
      const {todolistId, entityStatus} = action.payload
      return state.map(el => el.id === todolistId ? {...el, entityStatus} : el)
    }
    default: {
      return state
    }
  }
}

//Actions

export const removeTodolist = (todolistId: string) => ({ type: "REMOVE_TODOLIST", payload: { todolistId } }) as const

export const addTodolist = (todolist: Todolist) => ({ type: "ADD_TODOLIST", payload: { todolist } }) as const

export const changeTodolistFilter = (payload: { todolistId: string; filter: FilterValue }) =>
  ({ type: "CHANGE_FILTER", payload }) as const

export const changeTodolistTitle = (payload: { todolistId: string; title: string }) =>
  ({ type: "CHANGE_TODOLIST_TITLE", payload }) as const

export const setTodolists = (todolists: Todolist[]) => {
  return { type: "SET_TODOLISTS", todolists } as const
}

export const changeTodolistEntityStatus = (payload: {todolistId: string, entityStatus: RequestStatus}) => {
  return { type: "SET_TODOLIST_ENTITY_STATUS", payload } as const
}

//thunks

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(changeAppStatus("loading"))
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolists(res.data))
    dispatch(changeAppStatus("succeeded"))
  })
}

export const removeTodolistTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(changeAppStatus("loading"))
    dispatch(changeTodolistEntityStatus({todolistId, entityStatus: "loading"}))
    todolistsApi.removeTodolist(todolistId)
      .then((res) => {
      if (res.data.resultCode === 0){
        dispatch(removeTodolist(todolistId))
      } else {
        dispatch(changeTodolistEntityStatus({todolistId, entityStatus: "filed"}))
        dispatch(setError(res.data.messages.length ? res.data.messages[0] : "Some error..."))
      }
      dispatch(changeAppStatus("succeeded"))
    })
      .catch((error) => {
        handleServerError({dispatch, error})
        dispatch(changeTodolistEntityStatus({todolistId, entityStatus: "filed"}))
      })
  }

export const createTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(changeAppStatus("loading"))
    todolistsApi.createTodolist(title)
      .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTodolist(res.data.data.item))
        dispatch(changeAppStatus("succeeded"))
      } else {
        handleAppError<{item: Todolist}>({dispatch, data: res.data})
      }
    })
      .catch((error) => {
        handleServerError({dispatch, error})
      })
  }

export const updateTodolistTitleTC =
  (payload: { todolistId: string; title: string }): AppThunk =>
  (dispatch) => {
    dispatch(changeAppStatus("loading"))
    todolistsApi.updateTodolist(payload).then(() => {
      dispatch(changeTodolistTitle(payload))
      dispatch(changeAppStatus("succeeded"))
    })
  }

//Types

export type TodolistDomainType = Todolist & { filter: FilterValue; entityStatus: RequestStatus }

type FilterValue = "All" | "Active" | "Completed"

export type ActionTypes = RemoveTodolist | AddTodolist | ChangeTdolistFilter | ChangeTodolistTitle | SetTodolists | ChangeTodolistEntityStatus

export type RemoveTodolist = ReturnType<typeof removeTodolist>

export type AddTodolist = ReturnType<typeof addTodolist>

export type ChangeTdolistFilter = ReturnType<typeof changeTodolistFilter>

export type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitle>

export type SetTodolists = ReturnType<typeof setTodolists>

export type ChangeTodolistEntityStatus = ReturnType<typeof changeTodolistEntityStatus>
