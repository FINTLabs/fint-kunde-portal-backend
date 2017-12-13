import React, {Component} from 'react';
import 'typeface-roboto';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';


const styles = theme => ({});


class Apis extends Component {

    render() {
        //const {classes} = this.props;

        return (
            <h1>APIs</h1>
        );
    }
}

Apis.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Apis);