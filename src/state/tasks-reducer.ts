import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {Dispatch} from "redux";
import {taskstAPI} from "../api/tasks-api";
import {TaskResponseType} from "../api/tasks-types";
import {TaskType} from "../Todolist";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskResponseType
}


export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: TaskModelForACType
}

export type SetTasksType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: TaskResponseType[]
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [{
                    ...action.task,
                    isDone: action.task.status === 2
                }, ...state[action.task.todoListId]
                ]
            }
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            // let copyState: TasksStateType = {}
            // action.todolists.forEach(tl => {
            //     copyState[tl.id] = []
            // })
            // return copyState
            return action.todolists.reduce((acc, tl) => ({...acc, [tl.id]: []}), {})
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks.map(t => ({...t, isDone: t.status === 2} as TaskType))
            }
        }
        default:
            return state;
    }
}


// export type TaskResponseTypes = {
//     id: string
//     title: string
//     description: null | string
//     todoListId: string
//     order: number
//     status: number
//     priority: number
//     startDate: null | Date
//     deadline: null | Date
//     addedDate: Date
// }


// ACTION CREATORS

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskResponseType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

type TaskModelForACType = {
    title?: string,
    isDone?: boolean
    [key: string]: any
}
export const updateTaskAC = (taskId: string, model: TaskModelForACType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const setTasksAC = (todolistId: string, tasks: TaskResponseType[]): SetTasksType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}


// THUNK CREATORS

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    taskstAPI.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    taskstAPI.deleteTasks(todolistId, taskId)
        .then(res => dispatch(removeTaskAC(taskId, todolistId)))
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    taskstAPI.createTasks(todolistId, title)
        .then(res => dispatch(addTaskAC(res.data.data.item)))
}

export const updateTaskTC = (taskId: string, model: TaskModelForACType, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    //  Transformation "isDone" to "status"
    if ("isDone" in model) {
        model.status = model.isDone ? 2 : 0
        delete model.isDone
    }

    let taskFromState = getState().tasks[todolistId].find(t => t.id === taskId)

    if (taskFromState) {

        const task = {
            title: taskFromState.title,
            description: null,
            status: taskFromState?.isDone ? 2 : 0,
            priority: 0,
            startDate: null,
            deadline: null,
            ...model
        }

        taskstAPI.updateTasks(todolistId, taskId, task)
            .then(res => dispatch(updateTaskAC(taskId, {
                ...res.data.data.item,
                isDone: res.data.data.item.status === 2
            }, todolistId)))
    }
}
