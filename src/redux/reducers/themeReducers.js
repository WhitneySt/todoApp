import { themeTypes } from "../types/theme";

const initialState = {
    darkMode: false
}

export const themeReducers = (state = initialState, action) => {
    switch (action.type) {
        case themeTypes.toggleDarkMode:
            return {
                darkMode: !state.darkMode
            }
        default:
            return state;
    }
}