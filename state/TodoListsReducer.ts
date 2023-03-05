import {FilterType, TodoListType} from "../App";
import {v1} from "uuid";

export const TodoListsReducer = (state:TodoListType[], action: tsarType): TodoListType[]=> {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter((tl) => tl.id !== action.payload.todolistId1)
        }
        case "ADD-TODOLIST":{
            const newTodoListId = v1()
            const newTodo : TodoListType = {
                id: newTodoListId,
                title: action.payload.newTodolistTitle,
                filter:"All"
            }
            return [...state, newTodo]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((tl) => tl.id === action.payload.todolistId2 ? {...tl, title:action.payload.newTodolistTitle} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            /*setTodoList(todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: value} : tl))*/
            return state.map((tl) => tl.id === action.payload.todolistId2 ? {...tl, filter: action.payload.newFilter} : tl)
        }
    }
}
type tsarType = removeTodoListACType | addTodoListACType | changeTodoListTitleAC | changeTodoListFilterACType

type removeTodoListACType = ReturnType<typeof removeTodoListAC>

export const removeTodoListAC = (todolistId1:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload:{
            todolistId1
        }

    } as const
}

type addTodoListACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (newTodolistTitle: string) =>{
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle
        }

    }as const
}
type changeTodoListTitleAC = ReturnType<typeof changeTodoListTitleAC>

export const changeTodoListTitleAC = (newTodolistTitle: string, todolistId2:string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            newTodolistTitle,
            todolistId2
        }
    }as const
}


type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todolistId2: string, newFilter: FilterType) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2,
            newFilter
        }
    }as const
}