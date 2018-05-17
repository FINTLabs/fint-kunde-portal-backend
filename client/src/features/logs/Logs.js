import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';


const styles = theme => ({});


class Logs extends Component {

  render() {
    //const {classes} = this.props;

    return (
      <h1>Logs</h1>
    );
  }
}

Logs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logs);
