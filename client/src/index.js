//import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import App from './App';
import store from './store/configure-store'

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { PersistGate } from 'redux-persist/es/integration/react';
import reducers from './reducers/index';

const persistedReducer = persistReducer({ key: 'root', storage }, reducers);

const createReduxStore = () => {
  if (process.env.NODE_ENV === 'development') {
    return createStore(
      persistedReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    return createStore(persistedReducer);
  }
};

const store = createReduxStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<span />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
*/