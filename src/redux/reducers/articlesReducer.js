import {
    LOAD_ARTICLES,
    LOAD_ARTICLES_SUCCESS,
    LOAD_ARTICLES_FAILURE,
} from "../constants";

const initialState = {
    articles: [],
    loading: false,
    error: null,
};

export const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ARTICLES:
            return {
                ...state,
                loading: true,
            };
        case LOAD_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload,
            };
        case LOAD_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
