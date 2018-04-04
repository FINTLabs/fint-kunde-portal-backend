import React from 'react';  
import { Route, IndexRoute } from 'react-router';  
import App from './components/App'; 
import Dashboard from './dashboard/dashboard;
import AdaptersList from './components/adapters/AdaptersList';  
import AdapterPage from './components/adapters/AdaptersPage';  


export default (  
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="/adapterslist" component={AdaptersList} />
  </Route>
);