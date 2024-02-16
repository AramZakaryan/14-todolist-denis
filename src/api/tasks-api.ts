import {instance} from "./instance";
import {TaskResponseType, TaskResponseUniversalType} from "./tasks-types";
import {AxiosResponse} from "axios";


export const taskstAPI = {
    getTasks(todolistId: string) {
        return instance.get<null, AxiosResponse<{ items: TaskResponseType[] }>>
        (`${todolistId}/tasks`)
    },
    createTasks(todolistId: string, newTaskTitle: string,) {
        return instance.post<null, AxiosResponse<TaskResponseUniversalType<{ item:TaskResponseType }>>, { title: string }>
        (`${todolistId}/tasks`, {title: newTaskTitle})
    },
    deleteTasks(todolistId: string, taskId: string,) {
        return instance.delete<null, AxiosResponse<TaskResponseUniversalType>>
        (`${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string, newTaskTitle: string) {
        return instance.put<null, AxiosResponse<TaskResponseUniversalType>, { title: string }>
        (`${todolistId}/tasks/${taskId}`, {
            title: newTaskTitle
        })
    },
}