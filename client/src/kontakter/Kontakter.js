import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route} from "react-router-dom";
import KontakterContainer from "../containers/KontakterContainer";
import DashboardIcon from 'material-ui-icons/Home';
const styles = theme => ({});


class Kontakter extends Component {

    render() {
        return (
        	<Route exact path='/' component={KontakterContainer}/>

        );
    }
}

Kontakter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KontakterContainer);