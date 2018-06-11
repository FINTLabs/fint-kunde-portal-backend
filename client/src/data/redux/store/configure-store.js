import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import component from "../reducers/component";
import client from "../reducers/client";
import organisation from "../reducers/organisation";
import adapter from "../reducers/adapter";
import contact from "../reducers/contact";
import asset from "../reducers/asset";

const logger = createLogger();
const store = createStore(
  combineReducers({
    client,
    component,
    organisation,
    adapter,
    contact,
    asset,
  }),
  applyMiddleware(thunkMiddleware, logger)
);

export default store;
