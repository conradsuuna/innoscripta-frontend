import {
    UPDATE_USER_PREFERENCES,
    UPDATE_USER_PREFERENCES_SUCCESS,
    UPDATE_USER_PREFERENCES_FAILURE,
} from "../constants";

const initialState = {
    preferences: {},
    loading: false,
    error: null,
};

export const userPreferencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_PREFERENCES:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_PREFERENCES_SUCCESS:
            return {
                ...state,
                loading: false,
                preferences: action.payload,
            };
        case UPDATE_USER_PREFERENCES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
