import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {Route} from "react-router-dom";
import KlienterContainer from "../containers/KlienterContainer";

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