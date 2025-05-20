import { RootState } from "@/app/store.ts"
import { TodolistDomainType } from "@/features/todolists/model/todolists-slice.ts"

export const selectTodolists = (state: RootState): TodolistDomainType[] => state.todolists