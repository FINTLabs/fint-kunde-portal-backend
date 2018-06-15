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
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchKlienter} from "../../../data/redux/dispatchers/client";
import {green} from "@material-ui/core/colors/index";
import LoadingProgress from "../../../common/LoadingProgress";
import {addClientToAsset, deleteClientFromAsset} from "../../../data/redux/dispatchers/asset";
import AssetApi from "../../../data/api/AssetApi";
import WarningMessageBox from "../../../common/WarningMessageBox";
import InformationMessageBox from "../../../common/InformationMessageBox";
import {withContext} from "../../../data/context/withContext";

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
    AssetApi.deleteClientFromAsset(this.state.thisKlient, this.props.asset, this.props.context.currentOrganisation.name)
      .then(() => {
        this.props.notify(`${this.state.thisKlient.shortDescription} ble slettet fra ${this.props.asset.name}`);
        this.props.fetchKlienter();
      }).catch(error => {
    });
  };
  linkKlient = () => {
    AssetApi.addClientToAsset(this.state.thisKlient, this.props.asset,  this.props.context.currentOrganisation.name)
      .then(() => {

        this.props.notify(`${this.state.thisKlient.shortDescription} ble lagt til ${this.props.asset.name}`);
        this.props.fetchKlienter();
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
    for (let i = 0; i < this.props.clients.length; i++) {
      if (klient.dn === this.props.asset.clients[i]) {
        return true;
      }
    }
    return false;

  };
  getOrganisationKlienter = () => {
    return this.props.adapers
      .filter(klient => klient.organisations.length > 0)
      .filter(klient => klient.organisations.find(o => o === this.props.context.currentOrganisation.dn));
  };

  constructor(props) {
    super(props);
    this.state = {
      askLink: false,
      askUnLink: false,
      message: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.klient !== prevState.klient) {
      return {
        klient: nextProps.klient,
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchKlienter(this.props.context.currentOrganisation.name);
  }

  render() {
	  console.log("this.props")
console.log(this.props)
    if (!this.props.clients) {
      return <LoadingProgress/>;
    } else {
      return this.renderKlienter();
    }
  }

  renderKlienter() {
    const {classes} = this.props;
    const organisationKlienter = this.props.clients;
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
                    (<IconButton aria-label="Remove" onClick={() => this.askToUnLinkKlient(klient)}>
                      <RemoveIcon className={classes.removeIcon}/>
                    </IconButton>)
                    :
                    (<IconButton aria-label="Add" onClick={() => this.askToLinkKlient(klient)}>
                      <AddIcon className={classes.addIcon}/>
                    </IconButton>)
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
    fetchKlienter: fetchKlienter,
    addClientToAsset: addClientToAsset,
    deleteClientFromAsset: deleteClientFromAsset,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(AssetTabClient)));

