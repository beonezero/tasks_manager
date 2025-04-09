import { RootState } from "@/app/store.ts"
import { TodolistDomainType } from "@/features/todolists/model/todolists-reducer.ts"

export const selectTodolists = (state: RootState): TodolistDomainType[] => state.todolists