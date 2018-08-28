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
import { addClientToComponent, deleteClientFromComponent } from "../../../data/redux/dispatchers/client";
import ClientApi from "../../../data/api/ClientApi";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import InformationMessageBox from "../../../common/message-box/InformationMessageBox";
import { withContext } from "../../../data/context/withContext";
import RemoveButton from "../../../common/button/RemoveButton";
import AddButton from "../../../common/button/AddButton";
import TestAuthApi from "../../../data/api/TestAuthApi";

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

class ClientTabComponent extends React.Component {


  askToUnLinkComponent = (component) => {

    this.setState({
      askUnLink: true,
      message: "Er du sikker på at du vil fjerne clientet fra:  " + component.description + "?",
      component: component
    });

  };
  askToLinkComponent = (component) => {
    this.setState({
      askLink: true,
      message: "Vil du legge clientet til:  " + component.description + "?",
      component: component
    });
  };
  unLinkComponent = (component) => {
    const {clientConfig, currentOrganisation} = this.props.context;

    ClientApi.deleteClientFromComponent(this.props.client, component, currentOrganisation.name)
      .then(() => {
        this.props.notify(`${this.props.client.name} ble lagt til ${component.description}`);
        this.props.fetchComponents();
        TestAuthApi.clearAuth(clientConfig.testServiceBaseUrl, currentOrganisation.name)
          .then((response) => {
            console.log(response, "response");
          })
      }).catch(error => {
    });
  };
  linkComponent = (component) => {
    const {clientConfig, currentOrganisation} = this.props.context;

    ClientApi.addClientToComponent(this.props.client, component, currentOrganisation.name)
      .then(() => {
        this.props.notify(`${this.props.client.name} ble lagt til ${component.description}`);
        this.props.fetchComponents();
        TestAuthApi.clearAuth(clientConfig.testServiceBaseUrl, currentOrganisation.name)
          .then((response) => {
            console.log(response, "response");
          })
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

    if (this.isLinkedToClient(this.state.component) && confirmed) {
      this.unLinkComponent(this.state.component);
    }
  };
  isLinkedToClient = (component) => {
    for (let i = 0; i < component.clients.length; i++) {
      if (component.clients[i].toLowerCase() === this.props.client.dn.toLowerCase()) {
        return true;
      }

    }
    return false;

  };
  getOrganisationComponents = () => {
    return this.props.components
      .filter(component => component.organisations.length > 0)
      .filter(component => component.organisations.find(o => o === this.props.context.currentOrganisation.dn))
      .filter(component => !component.openData);
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
    if (nextProps.client !== prevState.client) {
      return {
        client: nextProps.client
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
                  {this.isLinkedToClient(component) ?
                    (<RemoveButton onClick={() => this.askToUnLinkComponent(component)}
                                   title="Fjerne klienten fra komponenten"/>)
                    :
                    (<AddButton onClick={() => this.askToLinkComponent(component)}
                                title="Legge klienten til komponenten"/>)
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
    addClientToComponent: addClientToComponent,
    deleteClientFromComponent: deleteClientFromComponent
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(ClientTabComponent)));

