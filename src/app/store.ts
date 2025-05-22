import { combineReducers, UnknownAction } from "redux"
import { todolistsReducer } from "../features/todolists/model/todolists-slice.ts"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "@/app/app-slice.ts"
import { authReducer } from "@/features/auth/model/auth-slice.ts"
import { tasksReducer } from "@/features/todolists/model/tasks-slice.ts"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer
})
// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
//export type RootState = typeof store.dispatch

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
