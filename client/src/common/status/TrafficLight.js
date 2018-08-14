import React, {Component} from 'react';
import {withStyles,} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";



const styles = (theme) => ({
  failed: {
    height: '25px',
    width: '25px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'inline-block',
    webkitBoxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    mozBoxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
  },
  ok: {
    height: '25px',
    width: '25px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    display: 'inline-block',
    webkitBoxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    mozBoxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
  },
  partiallyFailed: {
    height: '25px',
    width: '25px',
    backgroundColor: '#ff9800',
    borderRadius: '50%',
    display: 'inline-block',
    webkitBoxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    mozBoxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
  },
  progress: {},
});

class TrafficLight extends Component {

  getColor = () => {
    const {status, classes} = this.props;

    if (status === 'OK') return classes.ok;
    if (status === 'FAILED') return classes.failed;
    if (status === 'PARTIALLY_FAILED') return classes.partiallyFailed;
  };

  render() {
    const {status, classes} = this.props;
    return (
      <div>
        <Tooltip title={status} placement="right">
          {status === 'RUNNING' ?
            (<CircularProgress className={classes.progress} size={30} color="secondary"/>)
            :
            (<span className={this.getColor()}/>)
          }
        </Tooltip>
      </div>
    );
  }
}

TrafficLight.propTypes = {};

export default withStyles(styles)(TrafficLight);
