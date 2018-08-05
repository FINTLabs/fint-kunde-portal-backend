import React from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import ComponentIcon from "@material-ui/icons/WebAsset";
import ClientIcon from "@material-ui/icons/ImportantDevices";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchClients} from "../../../data/redux/dispatchers/client";
import {green} from "@material-ui/core/colors/index";
import LoadingProgress from "../../../common/LoadingProgress";
import {addClientToAsset, deleteClientFromAsset} from "../../../data/redux/dispatchers/asset";
import WarningMessageBox from "../../../common/WarningMessageBox";
import InformationMessageBox from "../../../common/InformationMessageBox";
import {withContext} from "../../../data/context/withContext";
import AssetApi from "../../../data/api/AssetApi";
import {Link} from "react-router-dom";

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
  addIcon: {
    color: theme.palette.secondary.main,
  },
  removeIcon: {
    color: theme.palette.primary.light,
  },
});

class AssetTabClient extends React.Component {


  askToUnLinkKlient = (klient) => {

    this.setState({
      thisKlient: klient,
      askUnLink: true,
      message: "Er du sikker på at du vil fjerne " + klient.shortDescription + " fra:  " + this.props.asset.name + "?",
      klient: klient,
    });

  };
  askToLinkKlient = (klient) => {
    this.setState({
      thisKlient: klient,
      askLink: true,
      message: "Vil du legge  " + klient.shortDescription + " til asset?",
      klient: klient,
    });

  };
  unLinkKlient = () => {
    /*
    this.props.deleteClientFromAsset(this.state.thisKlient, this.state.asset, this.props.context.currentOrganisation)
      .then(() => {
        this.props.notify(`${this.state.thisKlient.shortDescription} ble slettet fra ${this.state.asset.name}`);
        this.props.fetchAssets(this.props.context.currentOrganisation.name);
        this.props.fetchClients(this.props.context.currentOrganisation.name);
        this.setState({
          clientIsLinkedToAsset: false,
        });
      });
      */
    AssetApi.deleteClientFromAsset(this.state.thisKlient, this.props.asset, this.props.context.currentOrganisation)
      .then(() => {
        this.props.notify(`${this.state.thisKlient.shortDescription} ble slettet fra ${this.props.asset.name}`);
        this.setState({clientIsLinkedToAsset: false});
        this.props.fetchAssets(this.props.context.currentOrganisation.name);
        this.props.fetchClients(this.props.context.currentOrganisation.name);
      }).catch(error => {
    });
  };

  linkKlient = () => {

    /*
    this.props.addClientToAsset(this.state.thisKlient, this.state.asset, this.props.context.currentOrganisation)
      .then(() => {
        this.props.notify(`${this.state.thisKlient.shortDescription} ble lagt til ${this.state.asset.name}`);
        this.props.fetchAssets(this.props.context.currentOrganisation.name);
        this.props.fetchClients(this.props.context.currentOrganisation.name);
        this.setState({
          clientIsLinkedToAsset: true,
        });

      });
      */
    AssetApi.addClientToAsset(this.state.thisKlient, this.props.asset, this.props.context.currentOrganisation)
      .then(() => {
        this.props.notify(`${this.state.thisKlient.shortDescription} ble lagt til ${this.props.asset.name}`);
        this.setState({clientIsLinkedToAsset: true});
        this.props.fetchAssets(this.props.context.currentOrganisation.name);
        this.props.fetchClients(this.props.context.currentOrganisation.name);
      }).catch(error => {
    });
  };
  onCloseLink = (confirmed) => {
    this.setState({
      askLink: false,
    });

    if (confirmed) {
      this.linkKlient(this.state.klient);
    }
  };
  onCloseUnLink = (confirmed) => {
    this.setState({
      askUnLink: false,
    });

    if (confirmed) {
      this.unLinkKlient();
    }
  };
  isLinkedToAsset = (klient) => {
    if (this.state.clientIsLinkedToAsset === null) {
      for (let i = 0; i < this.props.asset.clients.length; i++) {
        if (klient.dn === this.props.asset.clients[i]) {
          return true;
        }
      }
      return false;
    }
    return this.state.clientIsLinkedToAsset;

  };

  hasAsset = (client) => {
    console.log(client);
    return client.assetId !== null;
  };

  constructor(props) {
    super(props);
    this.state = {
      askLink: false,
      askUnLink: false,
      message: '',
      clientIsLinkedToAsset: null
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.clients !== prevState.clients) {
      return {
        clients: nextProps.clients,
      };
    }
    return null;
  }


  componentDidMount() {
    this.props.fetchClients(this.props.context.currentOrganisation.name);
  }

  render() {
    if (!this.state.clients) {
      return <LoadingProgress/>;
    } else {
      return this.renderKlienter();
    }
  }

  renderKlienter() {
    const {classes} = this.props;
    const organisationKlienter = this.state.clients;
    if (organisationKlienter.length > 0) {
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
            {organisationKlienter.map((klient) =>
              <ListItem className={classes.listItem} key={klient.dn}>
                <ListItemAvatar>
                  <Avatar className={classes.itemAvatar}>
                    <ComponentIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={klient.shortDescription}
                  secondary={klient.name}
                />
                <ListItemSecondaryAction>
                  {this.isLinkedToAsset(klient) ?
                    (
                      <div>
                        <IconButton aria-label="Remove" onClick={() => this.askToUnLinkKlient(klient)}>
                          <RemoveIcon className={classes.removeIcon}/>
                        </IconButton>
                        <IconButton aria-label="Remove" component={Link} to="/clients">
                          <ClientIcon/>
                        </IconButton>
                      </div>
                    ) : (
                      <IconButton aria-label="Add" disabled={this.hasAsset(klient)}
                                  onClick={() => this.askToLinkKlient(klient)}>
                        <AddIcon className={this.hasAsset(klient) ? null : classes.addIcon}/>
                      </IconButton>
                    )
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
        <Typography variant="subheading">Det er ikke lagt til noen klienter for denne organisasjonen.</Typography>
      );

    }
  }
}

function mapStateToProps(state) {
  return {
    clients: state.client.clients,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchClients: fetchClients,
    addClientToAsset: addClientToAsset,
    deleteClientFromAsset: deleteClientFromAsset,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(AssetTabClient)));

