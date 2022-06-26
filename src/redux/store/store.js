import { combineReducers, createStore } from "redux";
import { todoReducers } from "../reducers/todoReducers";
import { themeReducers } from "../reducers/themeReducers";

const reducers = combineReducers({
    todoReducers: todoReducers,
    themeReducers: themeReducers
})

export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);