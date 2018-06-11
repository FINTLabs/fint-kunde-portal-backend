import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle,} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import AssetTabView from "./AssetTabView";
import AutoHideNotification from "../../../common/AutoHideNotification";


const styles = () => ({});

class AssetView extends React.Component {

  showUpdateButton = (show) => {
    this.setState({showUpdateButton: show});
  };

  notify = (message) => {
    this.setState({
      notify: true,
      notifyMessage: message,
    });
  };

  updateAssetState = (event) => {
    const field = event.target.name;
    const asset = this.state.asset;
    asset[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });
  };

  handleUpdate = () => {

    this.props.updateAsset(this.state.asset);
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
      asset: Object.assign({}, this.props.asset),
      isSaving: true,
      copiedToClipboard: false,
      notify: false,
      notifyMessage: '',
      showUpdateButton: true,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.asset !== prevState.asset) {
      return {
        asset: nextProps.asset,
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
            <DialogTitle id="form-dialog-title">Oppdater asset</DialogTitle>
            <DialogContent>
              <AssetTabView
                asset={this.state.asset}
                onCopy={this.onCopy}
                updateAssetState={this.updateAssetState}
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

AssetView.propTypes = {};

export default withStyles(styles)(AssetView);
