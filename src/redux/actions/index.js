import {
    LOAD_ARTICLES,
    LOAD_ARTICLES_SUCCESS,
    LOAD_ARTICLES_FAILURE,
    UPDATE_USER_PREFERENCES,
    UPDATE_USER_PREFERENCES_SUCCESS,
    UPDATE_USER_PREFERENCES_FAILURE,
    LOAD_ARTICLE_SOURCES,
    LOAD_ARTICLE_SOURCES_SUCCESS,
    LOAD_ARTICLE_SOURCES_FAILURE,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from "../constants";

// ARTICLES
export const loadArticles = () => ({
    type: LOAD_ARTICLES,
});

export const loadArticlesSuccess = (articles) => ({
    type: LOAD_ARTICLES_SUCCESS,
    payload: articles,
});

export const loadArticlesFailure = (error) => ({
    type: LOAD_ARTICLES_FAILURE,
    error,
});

// ARTICLE SOURCES
export const loadArticleSources = () => ({
    type: LOAD_ARTICLE_SOURCES,
});

export const loadArticleSourcesSuccess = (sources) => ({
    type: LOAD_ARTICLE_SOURCES_SUCCESS,
    payload: sources,
});

export const loadArticleSourcesFailure = (error) => ({
    type: LOAD_ARTICLE_SOURCES_FAILURE,
    error,
});

// USER PREFERENCES
export const updateUserPreferences = () => ({
    type: UPDATE_USER_PREFERENCES,
});

export const updateUserPreferencesSuccess = (preferences) => ({
    type: UPDATE_USER_PREFERENCES_SUCCESS,
    payload: preferences,
});

export const updateUserPreferencesFailure = (error) => ({
    type: UPDATE_USER_PREFERENCES_FAILURE,
    error,
});

// USER REGISTRATION AND LOGIN
export const register = () => ({
    type: REGISTER,
});

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS,
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    error,
});

export const login = () => ({
    type: LOGIN,
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    error,
});
