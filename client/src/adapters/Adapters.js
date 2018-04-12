import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route} from "react-router-dom";
import AdaptersList from "../containers/AdaptersList";
import DashboardIcon from 'material-ui-icons/Home';
const styles = theme => ({});


class Adapters extends Component {

    render() {
        //const {classes} = this.props;

        return (
        	<Route exact path='/' component={AdaptersList}/>

        );
    }
}

Adapters.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdaptersList);