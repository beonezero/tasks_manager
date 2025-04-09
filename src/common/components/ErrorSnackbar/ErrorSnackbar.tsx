import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import { useAppDispatch, useAppSelector } from "@/app/hooks.ts"
import { selectError } from "@/app/app-selectors.ts"
import { setError } from "@/app/app-reducer.ts"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setError(null))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {error}
      </Alert>
    </Snackbar>
  )
}
