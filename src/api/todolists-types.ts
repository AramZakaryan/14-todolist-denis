export type TodolistResponseType = {
    id: string
    title: string
    addedDate: Date
    order: number
}
export type TodolistResponseUniversalType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}