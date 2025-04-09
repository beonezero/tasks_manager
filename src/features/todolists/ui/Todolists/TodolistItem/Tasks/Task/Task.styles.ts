import { SxProps } from "@mui/material"

export const getTaskSx = (isDone: boolean): SxProps => {
  return {
    p: 0,
    justifyContent: "space-between",
    opacity: isDone ? 0.5 : 1,
  }
}
