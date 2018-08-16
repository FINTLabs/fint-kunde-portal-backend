import PropTypes from 'prop-types'
import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton, withStyles } from "@material-ui/core";
import AddIcon from "../../../node_modules/@material-ui/icons/AddCircle";

const styles = (theme) => ({
  addIcon: {
    color: theme.palette.secondary.dark
  },
});
class AddButton extends Component {
  render() {
    const {classes} = this.props;
    return (
        <Tooltip
          placement={this.props.placement}
          title={this.props.title}
        >
          <IconButton aria-label="Add" onClick={this.props.onClick}>
            <AddIcon className={classes.addIcon}/>
          </IconButton>
        </Tooltip>
    );
  }
}

AddButton.defaultProps = {
  placement: "top"
};

AddButton.propTypes = {
  classes: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  placement: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
export default withStyles(styles)(AddButton);

