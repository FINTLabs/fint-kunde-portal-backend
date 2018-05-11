import React, {Component} from 'react';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from "material-ui";
import PropTypes from 'prop-types';
import Main from "./main/Main";
import {bindActionCreators} from 'redux';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {fetchComponents} from "./data/redux/actions/components";

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
    this.props.fetchComponents(this.props.org)

  }

  static childContextTypes = {
    organisation: PropTypes.string,
    components: PropTypes.array
  };

  getChildContext() {
    return {
      organisation: 'testing',
      components: this.props.components
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

App.propTypes = {

};

function mapStateToProps(state) {
  return {
    posts: state.posts,

  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({fetchComponents: fetchComponents}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));
