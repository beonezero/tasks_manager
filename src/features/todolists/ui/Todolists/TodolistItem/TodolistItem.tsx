import "../../../../../app/App.module.css"
import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "./FilterButtons/FilterButtons.tsx"
import { Tasks } from "./Tasks/Tasks.tsx"
import { TodolistDomainType } from "@/features/todolists/api/todolistsApi.types.ts"
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistItem = ({ todolist }: Props) => {
  const [ createTask ] = useCreateTaskMutation()
  const addTaskItemFormCallBack = (title: string) => {
    createTask({todolistId: todolist.id, title})
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <div>
        <AddItemForm
          disabled={todolist.entityStatus === "loading"}
          buttonTitle={"+"}
          callback={addTaskItemFormCallBack}
        />
      </div>
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
