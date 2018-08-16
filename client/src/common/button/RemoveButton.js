import PropTypes from 'prop-types'
import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton, withStyles } from "@material-ui/core";
import RemoveIcon from "../../../node_modules/@material-ui/icons/RemoveCircle";

const styles = (theme) => ({
  addIcon: {
    color: theme.palette.secondary.dark
  },
  removeIcon: {
    color: theme.palette.primary.light
  }
});
class RemoveButton extends Component {
  render() {
    const {classes} = this.props;
    return (
        <Tooltip
          placement={this.props.placement}
          title={this.props.title}
        >
          <IconButton aria-label="Remove" onClick={this.props.onClick}>
            <RemoveIcon className={classes.removeIcon}/>
          </IconButton>
        </Tooltip>
    );
  }
}

RemoveButton.defaultProps = {
  placement: "top"
};

RemoveButton.propTypes = {
  classes: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  placement: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
export default withStyles(styles)(RemoveButton);

