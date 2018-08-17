import PropTypes from "prop-types";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Button from "../../../node_modules/@material-ui/core/Button/Button";
import Grid from "../../../node_modules/@material-ui/core/Grid/Grid";
import Paper from "../../../node_modules/@material-ui/core/Paper/Paper";

const styles = (theme) => ({
  message: {
    //border: "dotted 1px gray",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    color: theme.palette.primary.contrastText,
    minHeight: "10px",
    minWidth: "500px"
  },
  logo: {
    marginBottom: theme.spacing.unit * 2,
    height: "25%",
    width: "25%"
  }
});

class NoGoMessage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.message}>
          <Grid container justify="center" alignItems="center">
            <img src="fint.svg" alt="logo" className={classes.logo}/>
          </Grid>
          <Grid container justify="center" alignItems="center">
            {this.props.message}
          </Grid>
        </Paper>
        <Button href={this.props.gotoUrl} fullWidth variant="raised" color="secondary">{this.props.buttonTitle}</Button>
      </React.Fragment>
    );
  }
}

NoGoMessage.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  gotoUrl: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(NoGoMessage);

