import { RootState } from "@/app/store.ts"

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn

export const selectIsInitialized = (state: RootState) => state.auth.isInitialized