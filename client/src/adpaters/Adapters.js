import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';


const styles = theme => ({});


class Adapters extends Component {

    render() {
        //const {classes} = this.props;

        return (
            <h1>Adapters</h1>
        );
    }
}

Adapters.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Adapters);