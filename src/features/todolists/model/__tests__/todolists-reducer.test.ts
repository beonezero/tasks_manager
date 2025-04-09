import { beforeEach, expect, test } from "vitest"
import {
  addTodolist,
  changeTodolistFilterAction,
  changeTodolistTitleAction,
  removeTodolist,
  Todolists,
  todolistsReducer,
} from "../todolists-reducer.ts"
import { v1 } from "uuid"

let startState: Todolists[]
const todolistId1 = v1()
const todolistId2 = v1()

beforeEach(() => {
  startState = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ]
})

test("should be correction add new todolist", () => {
  const endState: Todolists[] = todolistsReducer(startState, addTodolist("testTitle"))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("testTitle")
})

test("should be correction change title todolist", () => {
  const endState: Todolists[] = todolistsReducer(
    startState,
    changeTodolistTitleAction({
      todolistId: todolistId1,
      title: "newTitleTest",
    }),
  )

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe("newTitleTest")
})

test("should be correction remove one todolist", () => {
  const endState: Todolists[] = todolistsReducer(startState, removeTodolist(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].title).toBe("What to buy")
})

test("should be correction change todolist filter", () => {
  const endState: Todolists[] = todolistsReducer(
    startState,
    changeTodolistFilterAction({ todolistId: todolistId2, filter: "Completed" }),
  )

  expect(endState.length).toBe(2)
  expect(endState[1].filter).toBe("Completed")
})
