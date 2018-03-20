import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route} from "react-router-dom";
import KontakterList from "../containers/KontakterList";

const styles = theme => ({});


class Kontakter extends Component {

    render() {
        //const {classes} = this.props;

        return (
        	<Route exact path='/' component={KontakterList}/>

        );
    }
}

Kontakter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KontakterList);