import React, {ChangeEvent} from 'react';
type SuperCheckBoxPropsType = {
    isDone: boolean
    callBack: (checkedValue: boolean)=> void


}

export const SuperCheckBox = (props:SuperCheckBoxPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <div>
            <input type="checkbox" checked={props.isDone} onChange={onChangeHandler}/>
        </div>
    );
};

