import { createStore, applyMiddleware, compose } from "redux";
import promiseRedux from "redux-promise";
import thunkRedux from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore(intialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  return createStore(
    rootReducer,
    intialState,
    composeEnhancers(applyMiddleware(thunkRedux, promiseRedux))
  );
}
