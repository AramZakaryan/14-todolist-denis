export type TaskApiTypes = {
    id: string
    title: string
    description: null | string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: null | Date
    deadline: null | Date
    addedDate: Date
}

export type TaskResponseUniversalType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}