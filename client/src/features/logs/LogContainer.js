import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";

const styles = (theme) => (
  {}
);
class LogContainer extends Component {
  render() {
    return (
      <div>
        Her kommer logger
      </div>
    );
  }
}

LogContainer.propTypes = {};

export default withStyles(styles)(LogContainer);
