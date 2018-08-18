import React, {Component} from "react";
import AppContext from "./AppContext";
import ContactApi from "../api/ContactApi";
import LoadingProgress from "../../common/status/LoadingProgress";
import PropTypes from "prop-types";

import {Cookies, withCookies} from "react-cookie";
import ClientConfigApi from "../api/ClientConfigApi";


class AppProvider extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentOrganisation: undefined,
      organisations: undefined,
      clientConfig: undefined,
      setCurrentOrganisation: (organisation) => {
        this.setCurrentOrganisation(organisation);
      },
      refresh: () => {
        this.refreshState();
      }
    };
  }


  componentDidMount() {
    this.refreshState();
  }

  setCurrentOrganisation = (organisation) => {
    const {cookies} = this.props;
    cookies.set('organisation', organisation, {path: '/'});
    this.setState({currentOrganisation: organisation});
  };

  refreshState = () => {
    const {cookies} = this.props;

    ContactApi.fetchContactOrganisatons()
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          organisations: json,
          currentOrganisation: cookies.get('organisation') || json[0],
        });
      });

    ClientConfigApi.fetchClientConfig()
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          clientConfig: json,
        });
      });

  };

  render() {
    if (this.state.organisations === undefined || this.state.currentOrganisation === undefined) {
      return (<LoadingProgress/>);
    }
    else {
      return (
        <AppContext.Provider value={this.state}>
          {this.props.children}
        </AppContext.Provider>
      );
    }
  }

}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(AppProvider);
