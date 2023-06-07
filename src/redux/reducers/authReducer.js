import {
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from "../constants";

const initialState = {
    loading: false,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case LOGIN:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
