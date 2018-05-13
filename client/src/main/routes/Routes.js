import React from 'react';
import {Route} from "react-router-dom";
import AdaptersContainer from "../../features/adapters/AdaptersContainer";
import KontakterContainer from "../../features/kontakter/KontakterContainer";
import ClientsContainer from "../../features/clients/ClientsContainer";
import Logs from "../../features/logs/Logs";
import Dashboard from "../../features/dashboard/Dashboard";
import Support from "../../features/support/Support";
import ComponentContainer from "../../features/component/ComponentContainer";


class Routes extends React.Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/clients' component={ClientsContainer}/>
        <Route path='/adapters' component={AdaptersContainer}/>
        <Route path='/contacts' component={KontakterContainer}/>
        <Route path='/apis' component={ComponentContainer}/>
        <Route path='/logs' component={Logs}/>
        <Route path='/support' component={Support}/>
      </div>
    );
  }
}

export default Routes;
