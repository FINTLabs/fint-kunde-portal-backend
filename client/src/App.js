import React, {Component} from 'react';
import './App.css';
import 'typeface-roboto';
import {createMuiTheme, MuiThemeProvider, withStyles} from "material-ui";
import {grey, red} from 'material-ui/colors';
import PropTypes from 'prop-types';
import Main from "./main/Main";


const theme = createMuiTheme({
    palette: {
        primary: red,
        secondary: grey,
    },
    status: {
        danger: 'orange',
    },
});

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    }
});


class App extends Component {

    render() {
        //const {classes} = this.props;

        return (

            <MuiThemeProvider theme={theme}>
                <Main/>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);