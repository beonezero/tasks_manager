import { beforeEach, expect, test } from "vitest"

import { v1 } from "uuid"
import { addTask, changeTaskStatus, changeTaskTitle, removeTask, tasksReducer, TasksType } from "../tasks-slice.ts"
import { addTodolist, removeTodolist } from "../todolists-slice.ts"

let startState: TasksType
const todolistId1 = v1()
const todolistId2 = v1()

const taskId_1 = v1()
const taskId_2 = v1()
const taskId_3 = v1()
const taskId_4 = v1()
const taskId_5 = v1()

beforeEach(() => {
  startState = {
    [todolistId1]: [
      { id: taskId_1, title: "HTML&CSS", isDone: true },
      { id: taskId_2, title: "JS", isDone: true },
      { id: taskId_3, title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: taskId_4, title: "Rest API", isDone: true },
      { id: taskId_5, title: "GraphQL", isDone: false },
    ],
  }
})

test("whether it is correct to remove a task from todolist", () => {
  const endState: TasksType = tasksReducer(startState, removeTask({ todolistId: todolistId1, taskId: taskId_2 }))

  expect(endState[todolistId1].length).toBe(2)
  expect(endState[todolistId1][1].id).toBe(taskId_3)
})

test("correct task should be added to correct array", () => {
  const newTitle = "newTitleTest"
  const endState: TasksType = tasksReducer(startState, addTask({ todolistId: todolistId2, title: newTitle }))

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(3)
  expect(endState[todolistId2][0].title).toBe(newTitle)
  expect(endState[todolistId2][0].id).toBeDefined()
  expect(endState[todolistId2][0].isDone).toBeFalsy()
  // toBeFalsy() ===> toBe(false) ; toBeTruthy() ===> toBe(true)
  // .not.toBe("") принимаем всё, кроме пустой строки
})

test("status of specified task should be changed", () => {
  const endState: TasksType = tasksReducer(
    startState,
    changeTaskStatus({ todolistId: todolistId1, taskId: taskId_2, isDone: false }),
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][1].isDone).toBeFalsy()
})

test("title of specified task should be changed", () => {
  const newTitle = "newTaskTitle"
  const endState: TasksType = tasksReducer(
    startState,
    changeTaskTitle({ todolistId: todolistId2, taskId: taskId_4, title: newTitle }),
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2][0].title).toBe(newTitle)
})

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(startState, addTodolist("new todolist"))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("array should be deleted when a todolist is deleted", () => {
  const endState = tasksReducer(startState, removeTodolist(todolistId1))
  expect(endState[todolistId1]).toBeUndefined()
})
