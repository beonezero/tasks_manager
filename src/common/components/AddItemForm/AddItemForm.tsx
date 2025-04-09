import { ChangeEvent, KeyboardEvent, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

type AddItemFormType = {
  callback: (title: string) => void
  buttonTitle: string
  disabled?: boolean
}
export const AddItemForm = ({ callback, buttonTitle, disabled = false }: AddItemFormType) => {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<string>("")

  const onChangeInputHandler = (value: ChangeEvent<HTMLInputElement>) => {
    setTitle(value.currentTarget.value)
    if (value.currentTarget.value.trim()) {
      setError("")
    }
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter") {
      addTaskButtonHandler()
    }
  }

  const addTaskButtonHandler = () => {
    if (title.trim()) {
      callback(title.trim())
      setTitle("")
      setError("")
    } else {
      setError("Title is required")
    }
  }

  const styles = {
    maxHeight: "38px",
    maxWidth: "38px",
    minHeight: "38px",
    minWidth: "38px",
    marginLeft: "10px",
  }

  return (
    <>
      <TextField
        id="outlined-basic"
        size={"small"}
        error={!!error}
        value={title}
        label={error ? error : "что будем делать ?"}
        variant={"outlined"}
        onKeyDown={(e) => onKeyDownHandler(e)}
        onChange={onChangeInputHandler}
        disabled={disabled}
      />

      <Button style={styles} size={"small"} variant="contained" disabled={disabled} onClick={addTaskButtonHandler}>
        {buttonTitle}
      </Button>
    </>
  )
}
