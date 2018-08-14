import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {Typography, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";

const styles = theme => ({

  helpText: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.secondary.light,
  }
});

class FeatureHelperText extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.helpText}>
          <Typography variant='body1' paragraph>
            {this.props.children}
          </Typography>
        </Paper>
      </div>
    );
  }
}

FeatureHelperText.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FeatureHelperText);


