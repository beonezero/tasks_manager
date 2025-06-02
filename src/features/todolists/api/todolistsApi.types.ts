import { RequestStatus } from "@/app/app-slice.ts"

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodolistDomainType = Todolist & { filter: FilterValue; entityStatus: RequestStatus }

export type FilterValue = "All" | "Active" | "Completed"
