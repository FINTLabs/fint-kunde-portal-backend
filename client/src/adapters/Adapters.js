import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route} from "react-router-dom";
import AdaptersContainer from "../containers/AdaptersContainer";
import DashboardIcon from 'material-ui-icons/Home';
const styles = theme => ({});


class Adapters extends Component {

    render() {
        return (
        	<Route exact path='/' component={AdaptersContainer}/>

        );
    }
}

Adapters.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdaptersContainer);