import React, {Component} from 'react';
import 'typeface-roboto';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import ClientList from "./client-list/ClientList";


const styles = theme => ({});


class Clients extends Component {

    render() {
        //const {classes} = this.props;

        return (
            <ClientList/>
        );
    }
}

Clients.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Clients);
