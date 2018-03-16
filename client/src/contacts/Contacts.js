import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';


const styles = theme => ({});


class Contacts extends Component {

    render() {
        //const {classes} = this.props;

        return (
            <h1>Contacts</h1>
        );
    }
}

Contacts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contacts);