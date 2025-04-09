import { AddTodolist, RemoveTodolist, SetTodolists } from "./todolists-reducer.ts"
import { AppDispatch, AppThunk } from "@/app/store.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { Task, Tasks, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { ResultCode, TaskStatus } from "@/features/todolists/libs/enums.ts"
import { changeAppStatus, setError } from "@/app/app-reducer.ts"
const initialState: Tasks = {}

export const tasksReducer = (state: Tasks = initialState, action: ActionTypes): Tasks => {
  switch (action.type) {
    case "REMOVE_TASK": {
      const { todolistId, taskId } = action.payload
      return { ...state, [todolistId]: state[todolistId].filter((el) => el.id !== taskId) }
    }
    case "ADD_TASK": {
      const {task} = action.payload
      return { ...state, [task.todoListId]: [task, ...state[task.todoListId]] }
    }
    case "CHANGE_TASK_STATUS": {
      const { todolistId, taskId, isDone } = action.payload
      return { ...state, [todolistId]: state[todolistId].map((el) => (el.id === taskId ? { ...el, isDone } : el)) }
    }
    case "UPDATE_TASK": {
      const {todoListId, id} = action.payload.task
      return {...state, [todoListId]: state[todoListId].map(el => el.id === id ? action.payload.task : el)}
    }
    case "ADD_TODOLIST": {
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case "REMOVE_TODOLIST": {
      const copyTasks = { ...state }
      delete copyTasks[action.payload.todolistId]
      return copyTasks
    }
    case "SET_TODOLISTS": {
      const newState: Tasks = { ...state }
      action.todolists.forEach((el) => {
        newState[el.id] = []
      })
      return newState
    }
    case "SET_TASKS": {
      const { tasks, todolistId } = action.payload
      return { ...state, [todolistId]: tasks }
    }
    default: {
      return state
    }
  }
}

//Actions

export const removeTask = (payload: { todolistId: string; taskId: string }) =>
  ({ type: "REMOVE_TASK", payload }) as const

export const addTask = (payload: { task: Task }) => ({ type: "ADD_TASK", payload }) as const

export const changeTaskStatus = (payload: { todolistId: string; taskId: string; isDone: boolean }) =>
  ({ type: "CHANGE_TASK_STATUS", payload }) as const

export const updateTask = (payload: {task: Task}) =>
  ({ type: "UPDATE_TASK", payload }) as const

export const setTasks = (payload: { tasks: Task[]; todolistId: string }) =>
  ({
    type: "SET_TASKS",
    payload,
  }) as const

// Thunks

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    dispatch(setTasks({ tasks: res.data.items, todolistId }))
  })
}

export const removeTaskTC = (payload: { todolistId: string; taskId: string }) => (dispatch: AppDispatch) => {
  const { todolistId, taskId } = payload
  tasksApi.removeTask({ todolistId, taskId }).then(() => {
    dispatch(removeTask({ todolistId, taskId }))
  })
}

export const addTaskTC = (payload: { todolistId: string; title: string }) => (dispatch: AppDispatch) => {
      dispatch(changeAppStatus("loading"))
  tasksApi.createTask(payload).then((res) => {
    if (res.data.resultCode === ResultCode.Success){
      dispatch(addTask({ task: res.data.data.item }))
    } else {
      dispatch(setError(res.data.messages.length ? res.data.messages[0] : "Some error..."))
    }
    dispatch(changeAppStatus("succeeded"))
  })
}

export const updateTaskTitleTC = (payload: {title: string, task: Task}): AppThunk  => (dispatch: AppDispatch) => {
    const {todoListId, id, deadline, description, priority, startDate, status} = payload.task
    const updateTaskModel: UpdateTaskModel = {
      title: payload.title,
      deadline,
      description,
      priority,
      startDate,
      status
    }
    tasksApi.updateTask({todolistId: todoListId, taskId: id, updateTaskModel }).then((res) => {
      dispatch(updateTask({task: res.data.data.item}))
    })
  }

export const updateTaskStatusTC = (payload: {status: TaskStatus, task: Task}): AppThunk  => (dispatch: AppDispatch) => {
  const {todoListId, id, deadline, description, priority, startDate, title} = payload.task
  const updateTaskModel: UpdateTaskModel = {
    title,
    deadline,
    description,
    priority,
    startDate,
    status: payload.status
  }
  tasksApi.updateTask({todolistId: todoListId, taskId: id, updateTaskModel }).then((res) => {
    dispatch(updateTask({task: res.data.data.item}))
  })
}

// Types

export type ActionTypes =
  | RemoveTask
  | AddTask
  | ChangeTaskStatus
  | UpdateTask
  | AddTodolist
  | RemoveTodolist
  | SetTodolists
  | SetTasks

export type RemoveTask = ReturnType<typeof removeTask>
export type AddTask = ReturnType<typeof addTask>
export type ChangeTaskStatus = ReturnType<typeof changeTaskStatus>
export type UpdateTask = ReturnType<typeof updateTask>
export type SetTasks = ReturnType<typeof setTasks>
