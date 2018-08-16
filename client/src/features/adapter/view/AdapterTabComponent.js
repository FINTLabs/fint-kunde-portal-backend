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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchComponents } from "../../../data/redux/dispatchers/component";
import { green } from "@material-ui/core/colors/index";
import LoadingProgress from "../../../common/status/LoadingProgress";
import { addAdapterToComponent, deleteAdapterFromComponent } from "../../../data/redux/dispatchers/adapter";
import AdapterApi from "../../../data/api/AdapterApi";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import InformationMessageBox from "../../../common/message-box/InformationMessageBox";
import { withContext } from "../../../data/context/withContext";
import RemoveButton from "../../../common/button/RemoveButton";
import AddButton from "../../../common/button/AddButton";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  componentList: {
    width: "75%"
  },
  avtarstyle: {
    margin: 1,
    color: "#fff",
    backgroundColor: green[500]
  },
  title: {
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit
  },
  listItem: {
    borderBottom: "1px dashed lightgray"
  },
  itemAvatar: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.main
  }
});

class AdapterTabComponent extends React.Component {


  askToUnLinkComponent = (component) => {

    this.setState({
      askUnLink: true,
      message: "Er du sikker på at du vil fjerne adapteret fra:  " + component.description + "?",
      component: component
    });

  };
  askToLinkComponent = (component) => {
    this.setState({
      askLink: true,
      message: "Vil du legge adapteret til:  " + component.description + "?",
      component: component
    });
  };
  unLinkComponent = (component) => {
    AdapterApi.deleteAdapterFromComponent(this.props.adapter, component, this.props.context.currentOrganisation.name)
      .then(() => {
        this.props.notify(`${this.props.adapter.name} ble lagt til ${component.description}`);
        this.props.fetchComponents();
      }).catch(error => {
    });
  };
  linkComponent = (component) => {
    AdapterApi.addAdapterToComponent(this.props.adapter, component, this.props.context.currentOrganisation.name)
      .then(() => {

        this.props.notify(`${this.props.adapter.name} ble lagt til ${component.description}`);
        this.props.fetchComponents();
      }).catch(error => {
    });
  };
  onCloseLink = (confirmed) => {
    this.setState({
      askLink: false
    });

    if (confirmed) {
      this.linkComponent(this.state.component);
    }
  };
  onCloseUnLink = (confirmed) => {
    this.setState({
      askUnLink: false
    });

    if (this.isLinkedToAdapter(this.state.component) && confirmed) {
      this.unLinkComponent(this.state.component);
    }
  };
  isLinkedToAdapter = (component) => {
    for (let i = 0; i < component.adapters.length; i++) {
      if (component.adapters[i].toLowerCase() === this.props.adapter.dn.toLowerCase()) {
        return true;
      }

    }
    return false;

  };
  getOrganisationComponents = () => {
    const { currentOrganisation } = this.props.context;
    if (currentOrganisation.name === "fintlabs_no") {
      return this.props.components
        .filter(component => component.organisations.length > 0)
        .filter(component => component.organisations.find(o => o === currentOrganisation.dn));
    }
    return this.props.components
      .filter(component => component.organisations.length > 0)
      .filter(component => component.organisations.find(o => o === currentOrganisation.dn))
      .filter(component => !component.openData || !component.common);

  };

  constructor(props) {
    super(props);
    this.state = {
      askLink: false,
      askUnLink: false,
      message: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.adapter !== prevState.adapter) {
      return {
        adapter: nextProps.adapter
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchComponents();
  }

  render() {
    if (!this.props.components) {
      return <LoadingProgress/>;
    } else {
      return this.renderComponents();
    }
  }

  renderComponents() {

    const { classes } = this.props;
    const organisationComponents = this.getOrganisationComponents();
    if (organisationComponents.length > 0) {
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
            {organisationComponents.map((component) =>
              <ListItem className={classes.listItem} key={component.dn}>
                <ListItemAvatar>
                  <Avatar className={classes.itemAvatar}>
                    <ComponentIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={component.description}
                  secondary={component.basePath}
                />
                <ListItemSecondaryAction>
                  {this.isLinkedToAdapter(component) ?
                    (<RemoveButton onClick={() => this.askToUnLinkComponent(component)}
                                   title="Fjerne adapteret fra komponenten"/>)
                    :
                    (<AddButton onClick={() => this.askToLinkComponent(component)}
                                title="Legge adapteret til komponenten"/>)
                  }
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </div>
      );
    }
    else {
      return (
        <Typography variant="subheading">Det er ikke lagt til noen komponenter for denne organisasjonen.</Typography>
      );

    }
  }
}

function mapStateToProps(state) {
  return {
    components: state.component.components
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchComponents: fetchComponents,
    addAdapterToComponent: addAdapterToComponent,
    deleteAdapterFromComponent: deleteAdapterFromComponent
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(AdapterTabComponent)));

