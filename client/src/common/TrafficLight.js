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
  },
  ok: {
    height: '25px',
    width: '25px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    display: 'inline-block',
  },
  progress: {},
});

class TrafficLight extends Component {

  getColor = () => {
    const {status, classes} = this.props;

    if (status === 'OK') return classes.ok;
    if (status === 'FAILED') return classes.failed;
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
