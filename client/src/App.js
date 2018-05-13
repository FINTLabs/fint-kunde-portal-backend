import React, {Component} from 'react';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from "material-ui";
import PropTypes from 'prop-types';
import Main from "./main/Main";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f05545',
      main: '#b71c1c',
      dark: '#7f0000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#98ee99',
      main: '#66bb6a',
      dark: '#338a3e',
      contrastText: '#000',
    },
  },
});

class App extends Component {
  componentDidMount() {
    //this.props.fetchApis(this.props.org)
  }

  static childContextTypes = {
    organisation: PropTypes.string,
  };

  getChildContext() {
    return {
      organisation: 'testing',
    };
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Main/>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

export default (App);





