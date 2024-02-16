import axios from "axios";

export const instance = axios.create(
    {baseURL:"https://social-network.samuraijs.com/api/1.1/todo-lists/",
        withCredentials: true,
        headers: {
            'API-KEY': "3485684c-f79f-42a9-a6c9-e22cde9c6d79",
        }
    }
)
