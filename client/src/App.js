import React, {Component} from 'react';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from "material-ui";
import {grey, red} from 'material-ui/colors';
import PropTypes from 'prop-types';
import Main from "./main/Main";
import {fetchApis} from './actions/apisAction';
import {bindActionCreators} from 'redux';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';

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

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  }
});


class App extends Component {
  componentDidMount() {
    this.props.fetchApis(this.props.org)

  }

  static childContextTypes = {
    organisation: PropTypes.string,
    components: PropTypes.array
  };

  getChildContext() {
    return {
      organisation: 'testing',
      components: this.props.posts
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
  classes: PropTypes.object.isRequired,
  apis: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.posts,

  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({fetchApis: fetchApis}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));
