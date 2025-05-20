import "../../../../../app/App.module.css"
import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "./FilterButtons/FilterButtons.tsx"
import { Tasks } from "./Tasks/Tasks.tsx"
import { addTaskTC } from "../../../model/tasks-reducer.ts"
import { useAppDispatch } from "@/app/hooks.ts"
import { TodolistDomainType } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const addTaskItemFormCallBack = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <div>
        <AddItemForm disabled={todolist.entityStatus === "loading"} buttonTitle={"+"} callback={addTaskItemFormCallBack} />
      </div>
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
