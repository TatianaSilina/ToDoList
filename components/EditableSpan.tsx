import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@material-ui/core/TextField';
type EditableSpanPropsType = {
    title:string
    changeTitle:(title:string) => void
}

export const EditableSpan: FC<EditableSpanPropsType>  = (props) => {
    const[editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onEditMode = () => {
        setEditMode(true)
    }

    const OnChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
        ? <TextField
            value={title}
            autoFocus
            onBlur={offEditMode}
            onChange={OnChangeHandler}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

