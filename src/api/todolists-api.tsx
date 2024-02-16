import {instance} from "./instance";
import {TodolistResponseUniversalType, TodolistResponseType} from "./todolists-types";


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistResponseType[]>("")
    },
    createTodolist(newTodolistTitle: string) {
        return instance.post<TodolistResponseUniversalType<{ item: TodolistResponseType }>>("", {title: newTodolistTitle})
    },
    deleteTodolist(todoistId: string) {
        return instance.delete<TodolistResponseUniversalType>(`${todoistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<TodolistResponseUniversalType>(`${todolistId}`, {title: title});
    }
}
