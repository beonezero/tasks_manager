import { expect, test } from "vitest"
import { tasksReducer} from "../tasks-slice.ts"
import { addTodolist, TodolistDomainType, todolistsReducer } from "../todolists-slice.ts"
import { Tasks } from "@/features/todolists/api/tasksApi.types.ts"

test("ids should be equal", () => {
  const startTasksState: Tasks = {}
  const startTodolistsState: TodolistDomainType[] = []

  const action = addTodolist({todolist: {
      id: "123",
      title: "new Title",
      addedDate: "10.04.1996",
      order: 1
    }})

  const endTasksState: Tasks = tasksReducer(startTasksState, action)
  const endTodolistsState: TodolistDomainType[] = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
