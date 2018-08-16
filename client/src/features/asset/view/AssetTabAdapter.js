import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import ComponentIcon from "@material-ui/icons/WebAsset";
import { green } from "@material-ui/core/colors/index";
import LoadingProgress from "../../../common/status/LoadingProgress";
import AssetApi from "../../../data/api/AssetApi";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import InformationMessageBox from "../../../common/message-box/InformationMessageBox";
import { withContext } from "../../../data/context/withContext";
import RemoveButton from "../../../common/button/RemoveButton";
import AddButton from "../../../common/button/AddButton";

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  componentList: {
    width: '75%',
  },
  avtarstyle: {
    margin: 1,
    color: '#fff',
    backgroundColor: green[500],
  },
  title: {
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
  },
  listItem: {
    borderBottom: '1px dashed lightgray',
  },
  itemAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  },
});

class AssetTabAdapter extends React.Component {


  askToUnLinkAdapter = (adapter) => {
    this.setState({
      askUnLink: true,
      message: "Er du sikker på at du vil fjerne " + adapter.shortDescription + " fra:  " + this.props.asset.name + "?",
      adapter: adapter,
    });

  };
  askToLinkAdapter = (adapter) => {
    this.setState({
      askLink: true,
      message: "Vil du legge  " + adapter.shortDescription + " til asset?",
      adapter: adapter,

    });

  };

  unLinkAdapter = (adapter) => {
    AssetApi.deleteAdapterFromAsset(adapter, this.props.asset, this.props.context.currentOrganisation.name)
      .then(() => {
        this.props.notify(`${this.state.adapter.shortDescription} ble slettet fra ${this.props.asset.name}`);
        this.props.fetchAssets(this.props.context.currentOrganisation.name);
        this.props.fetchAdapters(this.props.context.currentOrganisation.name);
      }).catch(error => {
    });
  };

  linkAdapter = (adapter) => {
    AssetApi.addAdapterToAsset(adapter, this.props.asset, this.props.context.currentOrganisation.name)
      .then(() => {
        this.props.notify(`${this.state.adapter.shortDescription} ble lagt til ${this.props.asset.name}`);
        this.props.fetchAssets(this.props.context.currentOrganisation.name)
        this.props.fetchAdapters(this.props.context.currentOrganisation.name)
      }).catch(error => {
    });
  };

  onCloseLink = (confirmed) => {
    this.setState({
      askLink: false,
    });

    if (confirmed) {
      this.linkAdapter(this.state.adapter);
    }
  };
  onCloseUnLink = (confirmed) => {
    this.setState({
      askUnLink: false,
    });

    if (this.isLinkedToAsset(this.state.adapter) && confirmed) {
      this.unLinkAdapter(this.state.adapter);
    }
  };
  isLinkedToAsset = (adapter) => {

    for (let i = 0; i < adapter.assets.length; i++) {
      if (adapter.assets[i].toLowerCase() === this.props.asset.dn.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.adapters !== prevState.adapters) {
      return {
        adapters: nextProps.adapters,
      };
    }
    return null;
  }


  constructor(props) {
    super(props);
    this.state = {
      askLink: false,
      askUnLink: false,
      message: '',
    };
  }

  render() {
    if (!this.props.adapters) {
      return <LoadingProgress/>;
    } else {
      return this.renderAdapters();
    }
  }

  renderAdapters() {

    const {classes} = this.props;
    const organisationAdapters = this.props.adapters;

    if (organisationAdapters.length > 0) {
      return (
        <div>
          <WarningMessageBox
            show={this.state.askUnLink}
            message={this.state.message}
            onClose={this.onCloseUnLink}
          />
          <InformationMessageBox
            show={this.state.askLink}
            message={this.state.message}
            onClose={this.onCloseLink}
          />
          <List>
            {organisationAdapters.map((adapter) =>
              <ListItem className={classes.listItem} key={adapter.dn}>
                <ListItemAvatar>
                  <Avatar className={classes.itemAvatar}>
                    <ComponentIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={adapter.shortDescription}
                  secondary={adapter.name}
                />
                <ListItemSecondaryAction>
                  {this.isLinkedToAsset(adapter) ?
                    (<RemoveButton onClick={() => this.askToUnLinkAdapter(adapter)} title="Fjerne adapteret fra ressursen"/>)
                    :
                    (<AddButton onClick={() => this.askToLinkAdapter(adapter)} title="Legge adapteret til ressursen"/>)
                  }
                </ListItemSecondaryAction>
              </ListItem>,
            )}
          </List>
        </div>
      );
    }
    else {
      return (
        <Typography variant="subheading">Det er ikke lagt til noen adapters for denne organisasjonen.</Typography>
      );

    }
  }
}

export default withStyles(styles)(withContext(AssetTabAdapter));
