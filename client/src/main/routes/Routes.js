import React from 'react';
import {Route} from "react-router-dom";
import KontakterContainer from "../../features/kontakter/KontakterContainer";
import ClientsContainer from "../../features/clients/ClientsContainer";
import Logs from "../../features/logs/Logs";
import Dashboard from "../../features/dashboard/Dashboard";
import Support from "../../features/support/Support";
import ComponentContainer from "../../features/component/ComponentContainer";
import AdapterContainer from "../../features/adapter/AdapterContainer";


class Routes extends React.Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/clients' component={ClientsContainer}/>
        <Route path='/adapters' component={AdapterContainer}/>
        <Route path='/contacts' component={KontakterContainer}/>
        <Route path='/apis' component={ComponentContainer}/>
        <Route path='/logs' component={Logs}/>
        <Route path='/support' component={Support}/>
      </div>
    );
  }
}

export default Routes;
