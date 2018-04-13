import React from 'react';  
//import { Route } from 'react-router';  
import {BrowserRouter as Router, Route, IndexRoute,hashHistory,browserHistory} from "react-router-dom";
import App from './App'; 

import AdaptersList from './containers/AdaptersList';  
import AdapterView from './components/adapters/AdapterView';  
import AdapterPage from './components/adapters/AdapterPage';


export default (
		  <Route path="/" component={App}>
		    <Route path='/adapters' component={AdapterPage} />
		    <Route path="/adapter" render={({ props }) => (<AdapterView post={this.props.post} />)}/>
//		    <Route path='/adapter' component={AdapterPage} />
		  </Route>
		);

