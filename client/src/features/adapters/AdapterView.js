import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import {Snackbar, withStyles} from "material-ui";
import TextField from 'material-ui/TextField';
import AdapterTabView from "./AdapterTabView";
const styles = () => ({});

class AdapterView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: Object.assign({}, this.props.adapter),
      isSaving: true,
      copiedToClipboard: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.adapter !== prevState.adapter) {
      return {
        adapter: nextProps.adapter,
      };
    }

    return null;
  }

  onCopy = () => {
    this.setState({copiedToClipboard: true});
  }


  updateAdapterState = (event) => {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });
  };

  handleClose = () => {
    this.props.updateAdapter(this.state.adapter);
    this.props.onClose();
  };

  handleCancel = () => {
    this.props.onClose();
  };

  handleCopySnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({copiedToClipboard: false});
  };
  
  updateAdapterState = (event) => {
	    const field = event.target.name;
	    const adapter = this.state.adapter;
	    adapter[field] = event.target.value;
	    return this.setState({
	      value: event.target.value
	    });
	  };
	  
  render() {
	  console.log("this")
	  console.log(this)
    return (
      <div>

        <div>
          <Dialog
            open={this.props.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">Oppdater adapteren</DialogTitle>
            <DialogContent>
	            <AdapterTabView
		            adapter={this.state.adapter}
		            updateAdapterState={this.updateAdapterState}
	            />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancel} variant="raised" color="primary">
                Avbryt
              </Button>
              <Button onClick={this.handleClose} variant="raised" color="primary">
                Oppdater
              </Button>

            </DialogActions>
          </Dialog>
        </div>
      </div>
    )

  }
}

AdapterView.propTypes = {};

export default withStyles(styles)(AdapterView);
