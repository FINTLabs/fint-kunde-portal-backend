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
import {fetchAdapters} from "../../../data/redux/dispatchers/adapter";
import {green} from "@material-ui/core/colors/index";
import LoadingProgress from "../../../common/LoadingProgress";
import {addAdapterToAsset, deleteAdapterFromAsset} from "../../../data/redux/dispatchers/asset";
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

class AssetTabAdapter extends React.Component {


  askToUnLinkAdapter = (adapter) => {

    this.setState({
      thisAdapter: adapter,
      askUnLink: true,
      message: "Er du sikker på at du vil fjerne " + adapter.shortDescription + " fra:  " + this.props.asset.name + "?",
      adapter: adapter,
    });

  };
  askToLinkAdapter = (adapter) => {
    this.setState({
      thisAdapter: adapter,
      askLink: true,
      message: "Vil du legge  " + adapter.shortDescription + " til asset?",
      adapter: adapter,
    });

  };
  unLinkAdapter = () => {
    AssetApi.deleteAdapterFromAsset(this.state.thisAdapter, this.props.asset, this.props.context.currentOrganisation.name)
      .then(() => {
        this.props.notify(`${this.state.thisAdapter.shortDescription} ble slettet fra ${this.props.asset.name}`);
        this.props.fetchAdapters();
      }).catch(error => {
    });
  };
  linkAdapter = () => {
    AssetApi.addAdapterToAsset(this.state.thisAdapter, this.props.asset,  this.props.context.currentOrganisation.name)
      .then(() => {

        this.props.notify(`${this.state.thisAdapter.shortDescription} ble lagt til ${this.props.asset.name}`);
        this.props.fetchAdapters();
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

    if (confirmed) {
      this.unLinkAdapter();
    }
  };
  isLinkedToAsset = (adapter) => {
    for (let i = 0; i < this.props.adapters.length; i++) {
      if (adapter.dn === this.props.asset.adapters[i]) {
        return true;
      }
    }
    return false;

  };
  getOrganisationAdapters = () => {
    return this.props.adapers
      .filter(adapter => adapter.organisations.length > 0)
      .filter(adapter => adapter.organisations.find(o => o === this.props.context.currentOrganisation.dn));
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
    if (nextProps.adapter !== prevState.adapter) {
      return {
        adapter: nextProps.adapter,
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchAdapters(this.props.context.currentOrganisation.name);
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
                  primary={adapter.description}
                  secondary={adapter.name}
                />
                <ListItemSecondaryAction>
                  {this.isLinkedToAsset(adapter) ?
                    (<IconButton aria-label="Remove" onClick={() => this.askToUnLinkAdapter(adapter)}>
                      <RemoveIcon className={classes.removeIcon}/>
                    </IconButton>)
                    :
                    (<IconButton aria-label="Add" onClick={() => this.askToLinkAdapter(adapter)}>
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
        <Typography variant="subheading">Det er ikke lagt til noen adapters for denne organisasjonen.</Typography>
      );

    }
  }
}

function mapStateToProps(state) {
  return {
    adapters: state.adapter.adapters,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAdapters: fetchAdapters,
    addAdapterToAsset: addAdapterToAsset,
    deleteAdapterFromAsset: deleteAdapterFromAsset,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(AssetTabAdapter)));

