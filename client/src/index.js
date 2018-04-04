
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Provider} from 'react-redux';
import App from './App';
import store from './store/configure-store'
import reducers from './reducers/index';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import {loadAdapters} from './actions/adapterAction';
import {loadKontakter} from './actions/kontakterAction';

const persistedReducer = persistReducer({ key: 'root', storage }, reducers);

store.dispatch(loadAdapters());
store.dispatch(loadKontakter());

ReactDOM.render(
    <Provider store={store}>
    	<Router>
    		<Route path="/" component={App} />
    	</Router>
    </Provider>,
    document.getElementById('root')
);

