import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import allReducers from "../reducers/allReducers";

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunkMiddleware, logger)
);

export default store
