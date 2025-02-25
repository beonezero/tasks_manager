import type {FilterValue, Task,} from './App'
import {useState} from 'react';
import './App.css'
import {AddItemForm} from './Components/AddItemForm.tsx';

type Props = {
    title: string
    tasks: Task[]
    filter: FilterValue
    todolistId: string
    removeTasks: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: boolean) => void
    changeFilter: (todolistId: string, filter: FilterValue) => void
    removeTodolist: (todolistId: string) => void
}

export const TodolistItem = ({title, tasks, filter, todolistId, removeTasks, addTask, changeTaskStatus, changeFilter, removeTodolist}: Props) => {

    const [error, setError] = useState<string>('')

    const changeFilterAllHandler = () => {
        changeFilter(todolistId, "All")
    }

    const changeFilterActiveHandler = () => {
        changeFilter(todolistId, "Active")
    }

    const changeFilterCompletedHandler = () => {
        changeFilter(todolistId, "Completed")
    }

    const prevAddTask = (taskTitle: string, setTaskTitle: (taskTitle: string) => void) => {
        if (taskTitle.trim()) {
            addTask(todolistId, taskTitle.trim())
            setTaskTitle('')
            setError("")
        } else {
            setError("Error")
        }
    }

    const removeTaskHandler = (taskId: string) => {
        removeTasks(todolistId, taskId)
    }

    const currentTasksBlock = () => {
        switch (filter) {
            case 'Completed': {
                return tasks.filter(task => task.isDone)
            }
            case 'Active': {
                return tasks.filter(task => !task.isDone)
            }
            default:
                return tasks
        }
    }

    const onChangeCheckBoxHandler = (taskId: string, status: boolean) => {
        changeTaskStatus(todolistId, taskId, status)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const mappedTasks = currentTasksBlock().map(task => {
        return (
            <li className={task.isDone ? "isDone" : ""} key={task.id}>
                <input type="checkbox" onChange={(e) => onChangeCheckBoxHandler(task.id, e.currentTarget.checked)} checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => removeTaskHandler(task.id)}>X</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{title}</h3>
            <button onClick={removeTodolistHandler}>-</button>
            <div>
                <AddItemForm prevAddTask={prevAddTask} error={error} setError={setError}/>
                {error && <h4 className={"errorMessage"}>Title is required</h4>}
            </div>
            {currentTasksBlock().length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {mappedTasks}
                </ul>
            )}
            <div>
                <button className={filter === "All" ? "activeFilter" : ""} onClick={changeFilterAllHandler}>All</button>
                <button className={filter === "Active" ? "activeFilter" : ""} onClick={changeFilterActiveHandler}>Active</button>
                <button className={filter === "Completed" ? "activeFilter" : ""} onClick={changeFilterCompletedHandler}>Completed</button>
                {/*<Button title={'All'} />*/}
                {/*<Button title={'Active'} />*/}
                {/*<Button title={'Completed'} />*/}
            </div>
        </div>
    )
}
