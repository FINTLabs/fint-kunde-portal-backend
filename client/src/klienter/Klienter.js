import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route} from "react-router-dom";
import KlienterContainer from "../containers/KlienterContainer";
import DashboardIcon from 'material-ui-icons/Home';
const styles = theme => ({});


class Klienter extends Component {

    render() {
        return (
        	<Route exact path='/' component={KlienterContainer}/>

        );
    }
}

Klienter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KlienterContainer);