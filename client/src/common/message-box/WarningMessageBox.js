import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@material-ui/core";
import PropTypes from "prop-types";
import WarningIcon from "@material-ui/icons/Warning";
import {withStyles} from "@material-ui/core";


const styles = (theme) => ({
  warningIcon: {
    color: theme.palette.primary.main,
    fontSize: '80px',
    float: 'left',
    marginRight: theme.spacing.unit * 2,
  },
  text: {}
});

class WarningMessageBox extends React.Component {
  handleClose = (result) => {
    this.setState({open: false});
    this.props.onClose(result);
  };

  constructor(props) {
    super(props);
    this.state = {
      open: props.show,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show !== prevState.show) {
      return {
        open: nextProps.show,
      };
    }

    return null;
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent className={classes.content}>
            <WarningIcon className={classes.warningIcon}/>
            <DialogContentText className={classes.text} id="alert-dialog-description">
              {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(true)} variant="raised" color="primary" autoFocus>
              Ja
            </Button>
            <Button onClick={() => this.handleClose(false)} variant="raised" color="primary">
              Nei
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

WarningMessageBox.defaultProps = {
  title: "Advarsel"
};

WarningMessageBox.propTypes = {
  classes: PropTypes.any,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
export default withStyles(styles)(WarningMessageBox);

