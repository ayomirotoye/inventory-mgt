import { combineReducers } from "redux";
import authReducer from "./authReducer";

const appReducer = combineReducers({
  authReducer: authReducer
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};
export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
