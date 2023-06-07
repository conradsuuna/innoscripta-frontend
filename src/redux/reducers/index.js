import { combineReducers } from "redux";
import { articlesReducer } from "./articlesReducer";
import { userPreferencesReducer } from "./userPreferencesReducer";
import { articleSourcesReducer } from "./articleSourcesReducer";
import { authReducer } from "./authReducer";

export const reducers = combineReducers({
  articles: articlesReducer,
  settings: userPreferencesReducer,
  articleSources: articleSourcesReducer,
  auth: authReducer,
});
