import { RootState } from "@/app/store.ts"

export const authSelectors = (state: RootState) => state.auth?.isLoggedIn