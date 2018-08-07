import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle, withStyles,} from "@material-ui/core";
import ClientTabView from "./ClientTabView";
import AutoHideNotification from "../../../common/AutoHideNotification";


const styles = () => ({});

class ClientView extends React.Component {

  showUpdateButton = (show) => {
    this.setState({showUpdateButton: show});
  };

  notify = (message) => {
    this.setState({
      notify: true,
      notifyMessage: message,
    });
  };

  updateClientState = (event) => {
    const field = event.target.name;
    const client = this.state.client;
    client[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });
  };

  handleUpdate = () => {

    this.props.updateClient(this.state.client);
    this.props.onClose();
  };

  handleCancel = () => {
    this.props.onClose();
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
      notifyMessage: '',
    });
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      client: Object.assign({}, this.props.client),
      isSaving: true,
      copiedToClipboard: false,
      notify: false,
      notifyMessage: '',
      showUpdateButton: true,
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

  render() {
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}/>
        <div>
          <Dialog
            open={this.props.open}
            onClose={this.handleUpdate}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">{`Oppdater klient:`}</DialogTitle>
            <DialogContent>
              <ClientTabView
                client={this.state.client}
                onCopy={this.onCopy}
                updateClientState={this.updateClientState}
                notify={this.notify}
                showUpdateButton={this.showUpdateButton}
              />
            </DialogContent>
            <DialogActions>


              <Button onClick={this.handleCancel} variant="raised" color="secondary">
                {this.state.showUpdateButton ? 'Avbryt' : 'Lukk'}
              </Button>
              {this.state.showUpdateButton ? (
                < Button onClick={this.handleUpdate} variant="raised" color="secondary">
                  Oppdater
                </Button>) : null}

            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}

ClientView.propTypes = {};

export default withStyles(styles)(ClientView);
