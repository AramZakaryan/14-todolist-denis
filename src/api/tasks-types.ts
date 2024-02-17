export type TaskResponseType = {
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

export type TaskModelForApiType = {
    // id: string
    title: string
    description: null | string
    // todoListId: string
    // order: number
    status: number
    priority: number
    startDate: null | Date
    deadline: null | Date
    // addedDate: Date
}




