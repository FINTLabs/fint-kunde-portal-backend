import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import {Snackbar, withStyles} from "material-ui";
import ClientTabView from "./ClientTabView";


const styles = () => ({});

class ClientView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      client: Object.assign({}, this.props.client),
      isSaving: true,
      copiedToClipboard: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.client !== prevState.client) {
      return {
        client: nextProps.client,
      };
    }

    return null;
  }

  onCopy = () => {
    this.setState({copiedToClipboard: true});
  }


  updateClientState = (event) => {
    const field = event.target.name;
    const client = this.state.client;
    client[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });
  };

  handleClose = () => {
    this.props.updateClient(this.state.client);
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

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.copiedToClipboard}
          onClose={this.handleCopySnackbarClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message="Kopiert"
          autoHideDuration={1500}
        />
        <div>
          <Dialog
            open={this.props.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">Oppdater klienten</DialogTitle>
            <DialogContent>
              <ClientTabView
                klient={this.state.client}
                onCopy={this.onCopy}
                updateClientState={this.updateClientState}
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

ClientView.propTypes = {};

export default withStyles(styles)(ClientView);
