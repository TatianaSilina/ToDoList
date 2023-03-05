import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import Container from '@material-ui/core/Container';
import {ButtonAppBar} from "./components/ButtonAppBar";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export type FilterType = 'All' | 'Active' | 'Completed';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TaskStateType = {
    [todoListId: string]: TaskType[]
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoList] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn", filter: "All"},
        {id: todoListId_2, title: "What to learn2", filter: "All"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>
    ({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "WHISKEY", isDone: true},
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "ACE", isDone: false},
        ]
    })

    const changeTodoListFilter = (value: FilterType, todoListId: string) => {
        setTodoList(todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: value} : tl));
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoList(todoLists.map((tl) => tl.id === todoListId ? {...tl, title:title} : tl));
    }
    const removeTodoList = (todoListId: string) => {
        const updatedTodoLists = todoLists.filter((tl) => tl.id !== todoListId)
        setTodoList(updatedTodoLists)
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodo : TodoListType = {
            id: newTodoListId,
            title: title,
            filter:"All"
        }
        setTodoList([...todoLists, newTodo])
        setTasks({...tasks, [newTodoListId]: []})
    }


    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)});
    }
    const addTask = (newTitle: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]})
    }
    const changeStatus = (taskID: string, eventStatus: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskID ? {...el, isDone: eventStatus} : el)
        })

    }
    const changeTitle = (taskID: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskID ? {...el, title:title} : el)
        })

    }


    const getFilterTaskForRender = (tasks: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case "Active":
                return tasks.filter(el => !el.isDone)
            case "Completed":
                return tasks.filter(el => el.isDone)
            default:
                return tasks
        }
    }

    const todolistComponents = todoLists.map((tl) => {
        const filteredTasksForRender = getFilterTaskForRender(tasks[tl.id], tl.filter)
        return (
            <Grid item>
                <Paper style = {{padding: '30px'}}  elevation={3}>
                    <Todolist
                        changeTodoListTitle={changeTodoListTitle}
                        changeTodoListFilter={changeTodoListFilter}
                        title={tl.title}
                        tasks={filteredTasksForRender}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        todoListId={tl.id}
                        changeTitle={changeTitle}
                    />
                </Paper>

            </Grid>

        )
    })

    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed >
                <Grid container spacing={3} style = {{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3} >
                    {todolistComponents}
                </Grid>


            </Container>

        </div>
    );
}

export default App;
