import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";
/*import {Button} from "./components/Button";*/
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import {SuperCheckBox} from "./components/SuperCheckBox";




export type TodolistPropsType = {
    todoListId: string,
    title: string,
    tasks: TaskType[],
    filter: FilterType,
    removeTask: (taskId: string, todoListId: string) => void,
    addTask: (newTitle: string, todoListId: string) => void,
    changeStatus: (id: string, eventStatus: boolean, todoListId: string) => void,
    changeTodoListFilter: (value: FilterType, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void,
    changeTitle: (taskId: string, title: string, todoListId: string) => void,
    changeTodoListTitle: (title: string, todoListId: string) => void
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {

    let tasksList = props.tasks.map((el, index) => {

        const removeTaskHandler = () => {
            props.removeTask(el.id, props.todoListId)
        }

        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(el.id, e.currentTarget.checked, props.todoListId);
        }

        const changeTitle = (title: string) => props.changeTitle(el.id, title, props.todoListId)
        return (
            <li key={index} className={el.isDone ? 'isDone' : ''}>
                <IconButton onClick={removeTaskHandler} >
                    <DeleteForeverIcon/>
                </IconButton>
                {/*<Button callBack={() => removeTaskHandler()} name={'X'}/>*/}
                <Checkbox checked={el.isDone} onChange={changeStatusHandler}/>

                <EditableSpan title={el.title} changeTitle={changeTitle}/>
            </li>

        )
    })
    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }


    const onClickAll = (value: FilterType) => {
        props.changeTodoListFilter(value, props.todoListId)
    }

    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList} >
                    <DeleteForeverIcon/>
                </IconButton>
                {/*<Button callBack={onClickRemoveTodoList} name={'Х'}/>*/}
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <ButtonGroup
                    disableElevation
                    size={'small'}
                    >
                <Button
                    variant={props.filter === 'All' ? 'outlined' : 'contained'}
                    color={props.filter === 'All' ? 'secondary' : 'primary'}
                    onClick={() => onClickAll('All')}>All</Button>
                <Button
                    variant={props.filter === 'Active' ? 'outlined' : 'contained'}
                    color={props.filter === 'Active' ? 'secondary' : 'primary'}
                    onClick={() => onClickAll('Active')}>Active</Button>
                <Button
                    variant={props.filter === 'Completed' ? 'outlined' : 'contained'}
                    color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                    onClick={() => onClickAll('Completed')}>Completed</Button>
                {/*<Button filter={props.filter} name={'All'} callBack={() => onClickAll('All')}/>*/}
                {/*<Button filter={props.filter} name={'Active'} callBack={() => onClickAll('Active')}/>
                <Button filter={props.filter} name={'Completed'} callBack={() => onClickAll('Completed')}/>*/}
            </ButtonGroup>
            </div>
        </div>

    )
}
export default Todolist;