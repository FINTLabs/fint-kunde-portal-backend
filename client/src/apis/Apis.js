import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route} from "react-router-dom";
import ApiList from "../containers/ApiList";

const styles = theme => ({});


class Apis extends Component {

    render() {
        //const {classes} = this.props;

        return (
        	<Route exact path='/' component={ApiList}/>

        );
    }
}

Apis.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApiList);
