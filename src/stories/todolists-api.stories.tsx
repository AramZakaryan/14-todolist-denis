import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";


export default {
    title: 'API/Todolists'
}


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolists()
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.createTodolist("Uxxx Todolist")
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.deleteTodolist("9655e899-4ede-41f4-8817-adf55232d8a2")
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.updateTodolist("c120798c-3062-4b8a-a1c9-0de81f13d59b", "Changed Title by API")
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}