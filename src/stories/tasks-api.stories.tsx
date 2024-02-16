import React, {useEffect, useState} from 'react'
import {taskstAPI} from "../api/tasks-api";


export default {
    title: 'API/Tasks'
}


export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        taskstAPI.getTasks("c120798c-3062-4b8a-a1c9-0de81f13d59b")
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const CreateTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        taskstAPI.createTasks("c120798c-3062-4b8a-a1c9-0de81f13d59b","Nuevo Task")
            .then(response => setState(response.data.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const DeleteTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        taskstAPI.deleteTasks("c120798c-3062-4b8a-a1c9-0de81f13d59b","efe73597-3754-4383-a338-ef198444fbf2")
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>

}


export const UpdateTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        taskstAPI.updateTasks("c120798c-3062-4b8a-a1c9-0de81f13d59b",
            "21875393-6c06-4a9a-a966-bd2d4cbe743b",
            "Iroq vor Title")
            .then(response => setState(response.data))
    }, [])


    return <div>{JSON.stringify(state)}</div>

}