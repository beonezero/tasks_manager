import { applyMiddleware, combineReducers, legacy_createStore as createStore, UnknownAction } from "redux"
import { tasksReducer } from "../features/todolists/model/tasks-reducer.ts"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer.ts"
import { appReducer } from "./app-reducer.ts"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, {}, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
