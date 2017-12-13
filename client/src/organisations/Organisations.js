import React, {Component} from 'react';
import 'typeface-roboto';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';


const styles = theme => ({});


class Organisations extends Component {

    render() {
        //const {classes} = this.props;

        return (
            <h1>Organisasjoner</h1>
        );
    }
}

Organisations.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Organisations);