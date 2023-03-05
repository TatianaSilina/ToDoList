import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';



type AddIdemFormPropsType = {
    addItem: (title: string)=> void
}

export const AddItemForm: FC<AddIdemFormPropsType> = (props) => {
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    return (
        <div className={"addItemForm"}>
            <TextField
                label="type value"
                onKeyPress={onKeyPressHandler}
                value={title}
                onChange={onChangeHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton  onClick={addTaskHandler} color={"primary"}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
};

