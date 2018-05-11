import React from 'react';
import {Snackbar, withStyles} from "material-ui";

const styles = () => {

};

class AutoHideNotification extends React.Component {

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

  handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
    //this.props.onClose();
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.state.open}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={this.props.message}
        autoHideDuration={5000}
      />
    );
  }
}

export default withStyles(styles)(AutoHideNotification);

