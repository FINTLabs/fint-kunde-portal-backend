import PropTypes from 'prop-types'
import React from "react";
import {CircularProgress, withStyles} from "@material-ui/core";

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    position: 'absolute',
    top: '30%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
});

class LoadingProgress extends React.Component {

  render() {

    const {classes, color, size} = this.props;

    return (
      <CircularProgress color={color} className={classes.progress} size={size}/>
    );
  }

}

LoadingProgress.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  size: PropTypes.number
};

LoadingProgress.defaultProps = {
  color: 'secondary',
  size: 150
};

export default withStyles(styles)(LoadingProgress);

