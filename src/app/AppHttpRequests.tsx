import Checkbox from "@mui/material/Checkbox"
import { ChangeEvent, CSSProperties, useEffect, useState } from "react"
import { AddItemForm } from "@/common/components"
import { EditableSpan } from "@/common/components"
import type { Todolist } from "../features/todolists/api/todolistsApi.types.ts"
import type { Task, Tasks, UpdateTaskModel } from "../features/todolists/api/tasksApi.types.ts"
import { todolistsApi } from "../features/todolists/api/todolistsApi.ts"
import { TaskStatus } from "../features/todolists/libs/enums.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Tasks>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      setTodolists(res.data)
      res.data.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          setTasks((prev) => ({ ...prev, [tl.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      setTodolists((prev) => [res.data.data.item, ...prev])
      setTasks((prev) => ({ ...prev, [res.data.data.item.id]: [] }))
    })
  }

  const removeTodolistHandler = (todolistId: string) => {
    todolistsApi.removeTodolist(todolistId).then(() => {
      setTodolists((prev) => prev.filter((el) => el.id !== todolistId))
    })
  }

  const updateTodolistHandler = (todolistId: string, title: string) => {
    todolistsApi.updateTodolist({ todolistId, title }).then(() => {
      setTodolists((prev) => prev.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ todolistId, title }).then((res) => {
      setTasks((prev) => ({ ...prev, [todolistId]: [res.data.data.item, ...prev[todolistId]] }))
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.removeTask({ todolistId, taskId }).then(() => {
      setTasks((prev) => {
        return { ...prev, [todolistId]: prev[todolistId].filter((el) => el.id !== taskId) }
      })
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
    const updateTaskModel: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, updateTaskModel }).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [task.todoListId]: prev[task.todoListId].map((t) => (t.id === task.id ? res.data.data.item : t)),
      }))
    })
  }

  const changeTaskTitleHandler = (title: string, task: Task) => {
    const updateTaskModel: UpdateTaskModel = {
      description: task.description,
      title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, updateTaskModel }).then((res) => {
      setTasks((prevState) => ({
        ...prevState,
        [task.todoListId]: prevState[task.todoListId].map((el) => {
          return el.id === task.id ? res.data.data.item : el
        }),
      }))
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm buttonTitle={"+"} callback={createTodolistHandler} />

      {/* Todolists */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {todolists.map((tl: Todolist) => {
          return (
            <div key={tl.id} style={todolist}>
              <div>
                <EditableSpan title={tl.title} changeTitle={(title: string) => updateTodolistHandler(tl.id, title)} />
                <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
              </div>
              <AddItemForm buttonTitle={"x"} callback={(title) => createTaskHandler(title, tl.id)} />

              {/* Tasks */}
              {!!tasks[tl.id] &&
                tasks[tl.id].map((task: Task) => {
                  return (
                    <div key={task.id}>
                      <Checkbox
                        checked={task.status === TaskStatus.Completed}
                        onChange={(e) => changeTaskStatusHandler(e, task)}
                      />
                      <EditableSpan title={task.title} changeTitle={(title) => changeTaskTitleHandler(title, task)} />
                      <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Styles
const todolist: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
