import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";

const styles = (theme) => (
  {}
);
class AssetContainer extends Component {
  render() {
    return (
      <div>
        Her kommer assets
      </div>
    );
  }
}

AssetContainer.propTypes = {};

export default withStyles(styles)(AssetContainer);
