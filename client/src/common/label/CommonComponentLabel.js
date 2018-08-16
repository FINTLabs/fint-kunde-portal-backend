import React, { Component } from "react";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CommonComponentIcon from "@material-ui/icons/Share";
import Tooltip from "@material-ui/core/Tooltip";


const styles = (theme) => ({
  chip: {
    color: "#595a5b", //"rgba(0, 0, 0, 0.54)",
    backgroundColor: "#fff",
    webkitBoxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    mozBoxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  avatar: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main
  }
});

class CommonComponentLabel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Tooltip
        placement="top"
        title="Dette er en felles løsning som ikke trenger adapter."
      >
        <Chip
          avatar={
            <Avatar className={classes.avatar}>
              <CommonComponentIcon/>
            </Avatar>
          }
          className={classes.chip}
          label="Felles"
          color="secondary"
        />
      </Tooltip>
    );
  }
}

export default withStyles(styles)(CommonComponentLabel);