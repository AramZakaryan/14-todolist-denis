import {instance} from "./instance";
import {TodolistResponseUniversalType, TodolistResponseType} from "./todolists-types";
import {AxiosResponse} from "axios";


export const todolistAPI = {
    getTodolists() {
        return instance.get<null, AxiosResponse<TodolistResponseType[]>>
        ("")
    },
    createTodolist(newTodolistTitle: string) {
        return instance.post<null, AxiosResponse<TodolistResponseUniversalType<{ item: TodolistResponseType }>>, {
            title: string
        }>
        ("", {title: newTodolistTitle})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<null, AxiosResponse<TodolistResponseUniversalType>>
        (`${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<null, AxiosResponse<TodolistResponseUniversalType>, { title: string }>
        (`${todolistId}`, {title: title});
    }
}
