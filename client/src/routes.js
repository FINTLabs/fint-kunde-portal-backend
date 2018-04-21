import React from 'react';  
//import { Route } from 'react-router';  
import {BrowserRouter as Router, Route, IndexRoute,hashHistory,browserHistory} from "react-router-dom";
import App from './App'; 

import AdaptersList from './containers/AdaptersContainer';  
import AdapterView from './components/adapters/AdapterView';  
import KlientView from './components/klienter/KlientView';

export default (
		  <Route path="/" component={App}>
		    <Route path="/adapter" render={({ props }) => (<AdapterView post={this.props.post} />)}/>
		    <Route path="/klient" render={({ props }) => (<KlientView klient={this.props.klient} />)}/>
		  </Route>
		);
