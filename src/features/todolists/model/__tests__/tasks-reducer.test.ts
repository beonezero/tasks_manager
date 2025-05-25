import { beforeEach, expect, test } from "vitest"

import { v1 } from "uuid"
import { addTask, removeTask, setTasks, tasksReducer, updateTask } from "../tasks-slice.ts"
import { Tasks } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskPriority, TaskStatus } from "@/features/todolists/libs/enums.ts"

let startState: Tasks
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
      {description: null, title: "HTML&CSS", status: TaskStatus.New, priority: TaskPriority.Low, startDate: null, deadline: null, id: taskId_1, todoListId: todolistId1, order: 1,
        addedDate: "10.10.2020"},
      {description: null, title: "JS", status: TaskStatus.New, priority: TaskPriority.Low, startDate: null, deadline: null, id: taskId_2, todoListId: todolistId1, order: 1,
        addedDate: "10.10.2020"},
      {description: null, title: "React", status: TaskStatus.Completed, priority: TaskPriority.Low, startDate: null, deadline: null, id: taskId_3, todoListId: todolistId1, order: 1,
        addedDate: "10.10.2020"},

    ],
    [todolistId2]: [
      {description: null, title: "Redux", status: TaskStatus.New, priority: TaskPriority.Low, startDate: null, deadline: null, id: taskId_4, todoListId: todolistId1, order: 1,
        addedDate: "10.10.2020"},
      {description: null, title: "Next", status: TaskStatus.Completed, priority: TaskPriority.Low, startDate: null, deadline: null, id: taskId_5, todoListId: todolistId1, order: 1,
        addedDate: "10.10.2020"},
    ],
  }
})

test("whether it is correct to remove a task from todolist", () => {
  const endState: Tasks = tasksReducer(startState, removeTask({ todolistId: todolistId1, taskId: taskId_2 }))

  expect(endState[todolistId1].length).toBe(2)
  expect(endState[todolistId1][1].id).toBe(taskId_3)
})

test("correct task should be added to correct array", () => {
  const newTitle = "taskTitleTest"
  const endState: Tasks = tasksReducer(startState, addTask({task: {description: null, title: newTitle, status: TaskStatus.New, priority: TaskPriority.Low, startDate: null, deadline: null, id: "taskIdTest", todoListId: todolistId2, order: 1,
      addedDate: "10.10.2020"}}))

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(3)
  expect(endState[todolistId2][0].title).toBe(newTitle)
  expect(endState[todolistId2][0].id).toBe("taskIdTest")
  expect(endState[todolistId2][0].status).toBe(TaskStatus.New)
  // toBeFalsy() ===> toBe(false) ; toBeTruthy() ===> toBe(true)
  // .not.toBe("") принимаем всё, кроме пустой строки
})

test("update task", () => {
  const endState: Tasks = tasksReducer(
    startState,
    updateTask({ task: {
      description: null, title: "New JS", status: TaskStatus.Completed, priority: TaskPriority.Low, startDate: null, deadline: null, id: taskId_2, todoListId: todolistId1, order: 1,
        addedDate: "10.10.2020"
    }
    }),
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][1].status).toBe(TaskStatus.Completed)
  expect(endState[todolistId1][1].title).toBe("New JS")
})

test("set task", () => {
  const endState: Tasks = tasksReducer(
    {},
    setTasks({ tasks: [
      {
        description: null, title: "RTK", status: TaskStatus.New, priority: TaskPriority.Low, startDate: null, deadline: null, id: "testTaskId1", todoListId: todolistId1, order: 1,
        addedDate: "10.10.2020"
      },
        {
          description: null, title: "GraphQL", status: TaskStatus.New, priority: TaskPriority.Low, startDate: null, deadline: null, id: "testTaskId2", todoListId: todolistId1, order: 1,
          addedDate: "10.10.2020"
        }
      ],
      todolistId: todolistId1
    }),
  )

  expect(endState[todolistId1].length).toBe(2)
  expect(endState[todolistId1][0].id).toBe("testTaskId1")
  expect(endState[todolistId1][1].title).toBe("GraphQL")
  expect(endState[todolistId1][1].todoListId).toBe(todolistId1)
})
