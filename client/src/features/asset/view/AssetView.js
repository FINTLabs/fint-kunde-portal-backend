import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle,} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import AssetTabView from "./AssetTabView";
import AutoHideNotification from "../../../common/notification/AutoHideNotification";
import {bindActionCreators} from "redux";
import {fetchAdapters} from "../../../data/redux/dispatchers/adapter";
import {connect} from "react-redux";
import {withContext} from "../../../data/context/withContext";
import {fetchClients} from "../../../data/redux/dispatchers/client";



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

  componentDidMount() {
    this.props.fetchAdapters(this.props.context.currentOrganisation.name);
    this.props.fetchClients(this.props.context.currentOrganisation.name);
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      asset: Object.assign({}, this.props.asset),
      isSaving: true,
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
            <DialogTitle id="form-dialog-title">Oppdater ressurs</DialogTitle>
            <DialogContent>
              <AssetTabView
                asset={this.state.asset}
                updateAssetState={this.updateAssetState}
                notify={this.notify}
                showUpdateButton={this.showUpdateButton}
                fetchAssets={this.props.fetchAssets}
                fetchAdapters={this.props.fetchAdapters}
                adapters={this.props.adapters}
                fetchClients={this.props.fetchClients}
                clients={this.props.clients}
              />
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleCancel} variant="raised" color="secondary">
                {this.state.showUpdateButton ? 'Avbryt' : 'Lukk'}
             </Button>
              {this.state.showUpdateButton ? (
             <Button onClick={this.handleUpdate} variant="raised" color="secondary">
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

function mapStateToProps(state) {
  return {
    adapters: state.adapter.adapters,
    clients: state.client.clients,
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAdapters: fetchAdapters,
    fetchClients: fetchClients,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(AssetView)));
