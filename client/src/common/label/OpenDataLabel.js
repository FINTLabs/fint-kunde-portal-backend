import React, { Component } from "react";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import OpenDataIcon from "@material-ui/icons/LockOpen";
import Tooltip from "@material-ui/core/Tooltip";

const styles = (theme) => ({
  chip: {
    color: "#fff",
    backgroundColor: "#4c9fe8",
    webkitBoxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    mozBoxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  avatar: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
  }
});
class OpenDataLabel extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Tooltip
        placement="top"
        title="Dette er åpne data som ikke trenger å tilordnes organisasjonen. Denne komponenten trenger ikke adapter eller klienter."
      >
        <Chip
          avatar={<Avatar className={classes.avatar}><OpenDataIcon/></Avatar>}
          className={classes.chip}
          label="Åpne Data"
          color="primary"
        />
      </Tooltip>
    );
  }
}

export default withStyles(styles)(OpenDataLabel);