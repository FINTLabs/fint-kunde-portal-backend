
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import App from './App';
import store from './store/configure-store'
import reducers from './reducers/index';
//import routes from './routes';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';


const persistedReducer = persistReducer({ key: 'root', storage }, reducers);

ReactDOM.render(
    <Provider store={store}>
    	<BrowserRouter>
    		<App />
    	</BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

