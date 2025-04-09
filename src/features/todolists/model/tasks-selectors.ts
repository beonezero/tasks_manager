import { RootState } from "@/app/store.ts"
import { Tasks } from "@/features/todolists/api/tasksApi.types.ts"

export const selectTasks = (state: RootState): Tasks => state.tasks
