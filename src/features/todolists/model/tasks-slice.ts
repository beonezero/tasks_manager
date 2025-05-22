import { AppDispatch, AppThunk } from "@/app/store.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { Task, Tasks, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { ResultCode, TaskStatus } from "@/features/todolists/libs/enums.ts"
import { changeAppStatus, setError } from "@/app/app-slice.ts"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "@/features/todolists/model/todolists-slice.ts"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as Tasks,
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
  },
  reducers: (creators) => ({
    removeTask: creators.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const taskIndex = state[action.payload.todolistId].findIndex((el) => el.id === action.payload.taskId)
      if (taskIndex) {
        state[action.payload.todolistId].splice(taskIndex, 1)
      }
    }),
    addTask: creators.reducer<{ task: Task }>((state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    }),
    updateTask: creators.reducer<{ task: Task }>((state, action) => {
      const taskIndex = state[action.payload.task.todoListId].findIndex(el => el.id === action.payload.task.id)
      if (taskIndex) {
        state[action.payload.task.todoListId][taskIndex] = action.payload.task
      }
    }),
    setTasks: creators.reducer<{ tasks: Task[]; todolistId: string }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    })
  }),
})

export const tasksReducer = tasksSlice.reducer

export const {setTasks, updateTask, addTask, removeTask} = tasksSlice.actions

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
  dispatch(changeAppStatus({ status: "loading" }))
  tasksApi.createTask(payload).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(addTask({ task: res.data.data.item }))
    } else {
      dispatch(setError({ error: res.data.messages.length ? res.data.messages[0] : "Some error..." }))
    }
    dispatch(changeAppStatus({ status: "succeeded" }))
  })
}

export const updateTaskTitleTC =
  (payload: { title: string; task: Task }): AppThunk =>
  (dispatch: AppDispatch) => {
    const { todoListId, id, deadline, description, priority, startDate, status } = payload.task
    const updateTaskModel: UpdateTaskModel = {
      title: payload.title,
      deadline,
      description,
      priority,
      startDate,
      status,
    }
    tasksApi.updateTask({ todolistId: todoListId, taskId: id, updateTaskModel }).then((res) => {
      dispatch(updateTask({ task: res.data.data.item }))
    })
  }

export const updateTaskStatusTC =
  (payload: { status: TaskStatus; task: Task }): AppThunk =>
  (dispatch: AppDispatch) => {
    const { todoListId, id, deadline, description, priority, startDate, title } = payload.task
    const updateTaskModel: UpdateTaskModel = {
      title,
      deadline,
      description,
      priority,
      startDate,
      status: payload.status,
    }
    tasksApi.updateTask({ todolistId: todoListId, taskId: id, updateTaskModel }).then((res) => {
      dispatch(updateTask({ task: res.data.data.item }))
    })
  }
