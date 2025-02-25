import {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    error: string
    setError: (error: string) => void
    prevAddTask: (taskTitle: string, setTaskTitle: (taskTitle: string) => void) => void
}
export const AddItemForm = ({error, setError, prevAddTask}: AddItemFormType) => {
    const [taskTitle, setTaskTitle] = useState<string>('')

    const onChangeInputHandler = (value: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(value.currentTarget.value)
        if (value.currentTarget.value.trim()){
            setError("")
        }
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement> ) => {
        if (event.code === 'Enter') {
            prevAddTask(taskTitle, setTaskTitle)
        }
    }

    const onClickButtonHandler = () => {
        prevAddTask(taskTitle, setTaskTitle)
    }

    return (
        <>
            <input className={error ? "error" : ""} onKeyDown={(e) => onKeyDownHandler(e)} value={taskTitle} onChange={onChangeInputHandler}/>
            <button onClick={onClickButtonHandler}>+</button>
        </>
    );
};