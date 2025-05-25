import { beforeEach, expect, test } from "vitest"
import {
  addTodolist, changeTodolistFilter, changeTodolistTitle,
  removeTodolist, TodolistDomainType,
  todolistsReducer
} from "../todolists-slice.ts"
import { v1 } from "uuid"

let startState: TodolistDomainType[]
const todolistId1 = v1()
const todolistId2 = v1()

beforeEach(() => {
  startState = [
    { id: todolistId1, title: "What to learn", filter: "All", entityStatus: "idle", order: 1, addedDate: "01.01.2012" },
    { id: todolistId2, title: "What to buy", filter: "All", entityStatus: "idle", order: 1, addedDate: "01.01.2012"},
  ]
})

test("should be correction add new todolist", () => {
  const endState: TodolistDomainType[] = todolistsReducer(startState, addTodolist({todolist: {
      id: "123",
      title: "testTitle",
      addedDate: "10.04.1996",
      order: 1
    }}))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("testTitle")
})

test("should be correction change title todolist", () => {
  const endState: TodolistDomainType[] = todolistsReducer(
    startState,
    changeTodolistTitle({
      todolistId: todolistId1,
      title: "newTitleTest",
    }),
  )

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe("newTitleTest")
})

test("should be correction remove todolist", () => {
  const endState: TodolistDomainType[] = todolistsReducer(startState, removeTodolist({todolistId: todolistId1}))

  expect(endState.length).toBe(1)
  expect(endState[0].title).toBe("What to buy")
})

test("should be correction change todolist filter", () => {
  const endState: TodolistDomainType[] = todolistsReducer(
    startState,
    changeTodolistFilter({ todolistId: todolistId2, filter: "Completed" }),
  )

  expect(endState.length).toBe(2)
  expect(endState[1].filter).toBe("Completed")
})
