import {
    LOAD_ARTICLE_SOURCES,
    LOAD_ARTICLE_SOURCES_SUCCESS,
    LOAD_ARTICLE_SOURCES_FAILURE,
} from "../constants";

const initialState = {
    articleSources: [],
    articleCategories: [],
    loading: false,
    error: null,
};

export const articleSourcesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ARTICLE_SOURCES:
            return {
                ...state,
                loading: true,
            };
        case LOAD_ARTICLE_SOURCES_SUCCESS:
            return {
                ...state,
                loading: false,
                articleSources: action.payload.news_sources,
                articleCategories: action.payload.news_categories,
            };
        case LOAD_ARTICLE_SOURCES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
