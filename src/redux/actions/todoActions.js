import { todoTypes } from "../types/todo";

export const add = (item) => {
    return {
        type: todoTypes.add,
        payload: {
            id: item.id,
            title: item.title,
            status: false
        }
    }
}

export const toggleStatus = (item) => {
    return {
        type: todoTypes.toggleStatus,
        payload: {
            id: item.id
        }
    }
}

export const edit = (item) => {
    return {
        type: todoTypes.edit,
        payload: {
            id: item.id,
            title: item.title
        }
    }
}

export const deleteTodoItem = (item) => {
    return {
        type: todoTypes.delete,
        payload: {
            id: item.id
        }
    }
}

export const clearCompleted = () => {
    return {
        type: todoTypes.clearCompleted
    }
}