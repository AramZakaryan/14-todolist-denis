import {instance} from "./instance";
import {TaskResponseTypes, TaskResponseUniversalType} from "./tasks-types";
import {AxiosResponse} from "axios";


export const taskstAPI = {
    getTasks(todolistId: string) {
        return instance.get
        < null, AxiosResponse < {items: TaskResponseTypes[]} >>
        (`${todolistId}/tasks`)
    },
    createTasks(todolistId: string, newTaskTitle: string,) {
        return instance.post<TaskResponseUniversalType<TaskResponseTypes>,
            AxiosResponse<TaskResponseUniversalType<TaskResponseTypes>>,
            { title: string }>(`${todolistId}/tasks`, {title: newTaskTitle})
    },
    deleteTasks(todolistId: string, taskId: string,) {
        return instance.delete<TaskResponseUniversalType>(`${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string, newTaskTitle: string) {
        return instance.put<
            TaskResponseUniversalType,
            AxiosResponse<TaskResponseUniversalType>,
            { title: string }
        >(`${todolistId}/tasks/${taskId}`, {
            title: newTaskTitle
        })
    },
}