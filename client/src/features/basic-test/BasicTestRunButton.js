import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import RunIcon from '@material-ui/icons/PlayArrow';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    float: 'right',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  /*
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  */
});

class BasicTestRunButton extends React.Component {
  timer = null;

  state = {
    loading: false,
    success: true,
  };

  render() {
    const {loading, success} = this.props;
    const {classes} = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="fab"
            color="primary"
            className={buttonClassname}
            onClick={this.props.onClick}
            disabled={this.props.disabled || loading}
          >
            <RunIcon/>
          </Button>
          {loading && <CircularProgress size={68} className={classes.fabProgress}/>}
        </div>
      </div>
    );
  }
}

BasicTestRunButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTestRunButton);
