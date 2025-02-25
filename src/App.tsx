import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from 'react';
import {v1} from 'uuid';

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: Task[]
}

export type Todolists = {
    id: string
    title: string
    filter: FilterValue
}

export type FilterValue = 'All' | 'Active' | 'Completed'

export const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolists[]>([
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const removeTasks = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((item) => item.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, status: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(item => item.id === taskId ? {...item, isDone: status}: item)})
    }

    const changeFilter = (TodolistId: string, filter: FilterValue) => {
        setTodolists(todolists.map((item) => item.id === TodolistId ? {...item, filter} : item))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(item => item.id !== todolistID))
        const copyTasks = {...tasks}
        delete copyTasks[todolistID]
        setTasks(copyTasks)
    }
    console.log(todolists)
    console.log(tasks)

    return (
        <div className="app">
            {
                todolists.map((el) => <TodolistItem
                    key={el.id}
                    title={el.title} tasks={tasks[el.id]} todolistId={el.id}
                    addTask={addTask} changeTaskStatus={changeTaskStatus}
                    removeTasks={removeTasks} changeFilter={changeFilter} filter={el.filter}
                    removeTodolist={removeTodolist}
                />)
            }
        </div>
    )
}
