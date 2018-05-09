import React from 'react';
import Organisations from "../../organisations/Organisations";
import Support from "../../support/Support";
import Logs from "../../logs/Logs";
import KlienterContainer from "../../containers/KlienterContainer";
import Dashboard from "../../dashboard/Dashboard";
import {Route} from "react-router-dom";
import AdaptersContainer from "../../containers/AdaptersContainer";
import KontakterContainer from "../../containers/KontakterContainer";
import ApisContainer from "../../containers/ApisContainer";


class Routes extends React.Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/clients' component={KlienterContainer}/>
        <Route path='/adapters' component={AdaptersContainer}/>
        <Route path='/contacts' component={KontakterContainer}/>
        <Route path='/apis' component={ApisContainer}/>
        <Route path='/logs' component={Logs}/>
        <Route path='/support' component={Support}/>
      </div>
    );
  }
}

export default Routes;
