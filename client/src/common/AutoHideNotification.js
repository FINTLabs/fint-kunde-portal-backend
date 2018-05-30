import React from "react";
import {Snackbar, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = () => {

};

class AutoHideNotification extends React.Component {

  handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({open: false});
    this.props.onClose();
  };

  constructor(props) {
    super(props);

    this.state = {
      open: props.showNotification,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showNotification !== prevState.showNotification) {
      return {
        open: nextProps.showNotification,
      };
    }

    return null;
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.state.open}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={this.props.message}
        autoHideDuration={5000}
      />
    );
  }
}

AutoHideNotification.propTypes = {
  showNotification: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(AutoHideNotification);

