import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route} from "react-router-dom";
import ApisContainer from "../containers/ApisContainer";
import DashboardIcon from 'material-ui-icons/Home';
const styles = theme => ({});


class Apis extends Component {

    render() {
        return (
        	<Route exact path='/' component={ApisContainer}/>

        );
    }
}

Apis.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApisContainer);
