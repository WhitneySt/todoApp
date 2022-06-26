import { todoTypes } from "../types/todo";

const initialState = {
    list: [{
        id: 1,
        title: 'Complete online JavaScript course',
        status: true
    },
    {
        id: 2,
        title: 'Jag around the park 3x',
        status: false
    },
    {
        id: 3,
        title: '10 minutes meditation',
        status: false
    },
    {
        id: 4,
        title: 'Read for 1 hour',
        status: false
    },
    {
        id: 5,
        title: 'Pick up groceries',
        status: false
    },
    {
        id: 6,
        title: 'Complete Todo App',
        status: false
    }]
}

export const todoReducers = (state = initialState, action) => {
    switch (action.type) {
        case todoTypes.add:
            return {
                list: [...state.list, action.payload]
            }
        case todoTypes.toggleStatus:
            return {
                list: state.list.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            status: !item.status
                        }
                    } else {
                        return item
                    }
                })
            }
        case todoTypes.edit:
            return {
                list: state.list.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            title: action.payload.title
                        }
                    } else {
                        return item
                    }
                })
            }
        case todoTypes.delete:
            return {
                list: state.list.filter(item => item.id !== action.payload.id)
            }
        case todoTypes.clearCompleted: 
            return {
                list: state.list.filter(item => !item.status)
            }
        default:
            return state;
    }
}