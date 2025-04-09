import { expect, test } from "vitest"
import { tasksReducer, TasksType } from "../tasks-reducer.ts"
import { addTodolist, Todolists, todolistsReducer } from "../todolists-reducer.ts"

test("ids should be equal", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: Todolists[] = []

  const action = addTodolist("newTodolistTest")

  const endTasksState: TasksType = tasksReducer(startTasksState, action)
  const endTodolistsState: Todolists[] = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolistId)
  expect(idFromTodolists).toBe(action.payload.todolistId)
})
