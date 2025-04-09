import { KeyboardEvent, ChangeEvent, useState } from "react"
import style from "./editableSpam.module.css"

type Props = {
  title: string
  changeTitle: (title: string) => void
  disabled: boolean
}
export const EditableSpan = ({ title, changeTitle, disabled }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [inputTitle, setInputTitle] = useState<string>(title)
  const [error, setError] = useState<boolean>(false)
  const onDoubleClickSpanHandler = () => {
    if (!disabled){
      setToggle(true)
    }
  }
  const titleHandler = () => {
    if (inputTitle.trim()) {
      changeTitle(inputTitle)
      setToggle(false)
      setError(false)
    } else {
      setError(true)
    }
  }

  const onBlurInputHandler = () => {
    titleHandler()
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      titleHandler()
    }
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
  }

  return (
    <>
      {toggle ? (
        <input
          autoFocus
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
          value={inputTitle}
          onChange={onChangeInputHandler}
          onBlur={onBlurInputHandler}
          type="text"
        />
      ) : (
        <span className={disabled ? style.title_disabled : ""} onDoubleClick={onDoubleClickSpanHandler}>{title}</span>
      )}
    </>
  )
}
