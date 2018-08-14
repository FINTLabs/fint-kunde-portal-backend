import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle,} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import AdapterTabView from "./AdapterTabView";
import AutoHideNotification from "../../../common/notification/AutoHideNotification";


const styles = () => ({});

class AdapterView extends React.Component {

  showUpdateButton = (show) => {
    this.setState({showUpdateButton: show});
  };

  notify = (message) => {
    this.setState({
      notify: true,
      notifyMessage: message,
    });
  };

  updateAdapterState = (event) => {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });
  };

  handleUpdate = () => {

    this.props.updateAdapter(this.state.adapter);
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
      adapter: Object.assign({}, this.props.adapter),
      isSaving: true,
      copiedToClipboard: false,
      notify: false,
      notifyMessage: '',
      showUpdateButton: true,
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
            <DialogTitle id="form-dialog-title">Oppdater adapter</DialogTitle>
            <DialogContent>
              <AdapterTabView
                adapter={this.state.adapter}
                onCopy={this.onCopy}
                updateAdapterState={this.updateAdapterState}
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

AdapterView.propTypes = {};

export default withStyles(styles)(AdapterView);
