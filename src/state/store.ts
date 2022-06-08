import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const initialState = {};

const middleware = [thunk];

// check if app in dev mode and if redux dev tools is installed on the browser
const testDevTestRedux = process.env.NODE_ENV === "development" &&
  //@ts-expect-error
  window.__REDUX_DEVTOOLS_EXTENSION__


const store = testDevTestRedux ? createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware),
    //@ts-expect-error
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
) : createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware),
  )
);


export default store;
