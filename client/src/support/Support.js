import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';


const styles = theme => ({});


class Support extends Component {

    render() {
        //const {classes} = this.props;

        return (
            <h1>Support</h1>
        );
    }
}

Support.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Support);