import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import { Route } from "react-router-dom";
import KontakterContainer from "../containers/KontakterContainer";
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