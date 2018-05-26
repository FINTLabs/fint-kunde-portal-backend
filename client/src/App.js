import React, {Component} from 'react';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from "material-ui";
import Main from "./main/Main";
import AppProvider from "./data/context/AppProvider";
import {CookiesProvider} from 'react-cookie';


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


/*
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#efefef',
      main: '#bdbdbd',
      dark: '#8d8d8d',
      contrastText: '#000',
    },
    secondary: {
      light: '#95C81F',
      main: '#b71c1c',
      dark: '#148478',
      contrastText: '#fff',
    },
  },

});
*/

class App extends Component {


  componentDidMount() {
    //this.props.fetchApis(this.props.org)
  }


  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <CookiesProvider>
          <AppProvider>
            <Main/>
          </AppProvider>
        </CookiesProvider>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {}

export default (App);





