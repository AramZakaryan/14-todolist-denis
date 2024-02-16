import {instance} from "./instance";
import {TaskApiTypes, TaskResponseUniversalType} from "./tasks-types";




export const taskstAPI = {
    getTasks(todolistId: string) {
        return instance.get<TaskApiTypes[]>(`${todolistId}/tasks`)
    },
    createTasks(todolistId: string, newTaskTitle: string,) {
        return instance.post<TaskResponseUniversalType<TaskApiTypes>>(`${todolistId}/tasks`, {title: newTaskTitle})
    },
    deleteTasks(todolistId: string, taskId: string,) {
        return instance.delete<TaskResponseUniversalType>(`${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string, newTaskTitle:string) {
        return instance.put<TaskResponseUniversalType>(`${todolistId}/tasks/${taskId}`,{
            title: newTaskTitle
        } )
    },
}