import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {BrowserRouter} from "react-router-dom";
import AppMenu from "./appmenu/AppMenu";
import MeApi from "../data/api/MeApi";
import NoGoContainer from "../features/nogo/NoGoContainer";
import Provider from "react-redux/es/components/Provider";
import store from "../data/redux/store/configure-store";
import {CookiesProvider} from "react-cookie";
import AppProvider from "../data/context/AppProvider";


const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    overflow: "hidden"
  }
});

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      contactExists: false,
      contactHasOrganisations: false
    };
  }

  componentDidMount() {
    MeApi.getMe()
      .then(([response, json]) => {
        if (response.status === 200) {
          this.setState({
            contactExists: true,
            contactHasOrganisations: (json.legal.length > 0 || json.technical.length > 0),
            me: json
          });
        }
        else {
          this.setState({
            contactExists: false,
            contactHasOrganisations: false
          });
        }
      });
  }

  render() {
    const {contactExists, contactHasOrganisations} = this.state;
    if (contactExists && contactHasOrganisations) {
      return this.renderAppMenu();
    }
    return (<NoGoContainer contactExists={contactExists} contactHasOrganisations={contactHasOrganisations}/>);
  }

  renderAppMenu() {
    const {classes} = this.props;
    return (
      <Provider store={store}>
        <CookiesProvider>
          <AppProvider>
            <BrowserRouter basename='/'>
              <div className={classes.root}>
                <AppMenu/>
              </div>
            </BrowserRouter>
          </AppProvider>
        </CookiesProvider>
      </Provider>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(Main);
