import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import allReducer from '../reducers/index';

const logger = createLogger();
const store = createStore(
    allReducer,  
     applyMiddleware(thunkMiddleware, logger)
);

export default store 