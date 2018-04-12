import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route} from "react-router-dom";
import KlienterList from "../containers/KlienterList";
import DashboardIcon from 'material-ui-icons/Home';
const styles = theme => ({});


class Klienter extends Component {

    render() {

    	return (
        	<Route exact path='/' component={KlienterList}/>

        );
    }
}

Klienter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KlienterList);