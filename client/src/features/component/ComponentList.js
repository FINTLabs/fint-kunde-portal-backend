import React, {Component} from 'react';
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "material-ui";
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import ComponentIcon from '@material-ui/icons/WebAsset';
import OrganisationApi from "../../data/api/OrganisationApi";
import AutoHideNotification from "../../common/AutoHideNotification";
import PropTypes from 'prop-types';
import ComponentsView from "./ComponentsView";
import WarningMessageBox from "../../common/WarningMessageBox";
import InformationMessageBox from "../../common/InformationMessageBox";


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  componentList: {
    width: '75%',
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
    color: theme.palette.secondary.dark,
  },
  removeIcon: {
    color: theme.palette.primary.light,
  },
});

class ComponentList extends Component {
  askToLinkComponent = (component) => {
    this.setState({
      askLink: true,
      message: "Vil du legge til komponenten:  " + component.description + " til organisasjonen?",
      component: component,
    });
  };
  askToUnLinkComponent = (component) => {
    this.setState({
      askUnLink: true,
      message: "Er du sikker på at du vil fjerne komponenten:  " + component.description + " fra organisasjonen?",
      component: component,
    });
  };
  linkComponent = (component) => {
    OrganisationApi.linkComponent(component).then(responseApi => {
      this.setState({
        notify: true,
        notifyMessage: `${component.description} ble lagt til!`,
      });
      this.props.fetchOrganisation();
      this.props.fetchComponents();
    }).catch(error => {
      alert(error);
    });
  };
  unlinkComponent = (component) => {
    OrganisationApi.unlinkComponent(component).then(responseApi => {
      this.setState({
        notify: true,
        notifyMessage: `${component.description} ble fjernet!`,
      });
      this.props.fetchOrganisation();
      this.props.fetchComponents();
    }).catch(error => {
      alert(error);
    });
  };
  onCloseLink = (confirmed) => {
    this.setState({
      askLink: false,
    });

    if (confirmed) {
      this.linkComponent(this.state.component);
    }
  };
  onCloseUnLink = (confirmed) => {
    this.setState({
      askUnLink: false,
    });

    if (this.isLinkedToOrganisation(this.state.component) && confirmed) {
      this.unlinkComponent(this.state.component);
    }
  };
  onCloseNotification = () => {
    this.setState({
      notify: false,
      notifyMessage: null,
    });
  };
  showComponent = (component) => {
    this.setState({
      showComponent: true,
      component: component,
    });
  };
  onCloseShowComponent = () => {
    this.setState({
      showComponent: false,
      component: null,
    });
  };
  isLinkedToOrganisation = (component) => {
    let componentOrganisations = component.organisations;

    for (let i = 0; i < componentOrganisations.length; i++) {
      if (componentOrganisations[i].toLowerCase() === this.props.organisation.dn.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  constructor(props) {
    super(props);
    this.state = {
      askLink: false,
      askUnLink: false,
      message: null,
      component: null,
      notify: false,
      notifyMessage: null,
      showComponent: false,
    };
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
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
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}/>
        <ComponentsView
          component={this.state.component}
          show={this.state.showComponent}
          onClose={this.onCloseShowComponent}
        />
        <div className={classes.componentList}>
          <Typography variant="headline" className={classes.title}>Komponenter</Typography>
          <Divider/>
          <List>
            {this.props.components.map((component) =>
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
                  {this.isLinkedToOrganisation(component) ?
                    (<IconButton aria-label="Remove" onClick={() => this.askToUnLinkComponent(component)}>
                      <RemoveIcon className={classes.removeIcon}/>
                    </IconButton>)
                    :
                    (<IconButton aria-label="Add" onClick={() => this.askToLinkComponent(component)}>
                      <AddIcon className={classes.addIcon}/>
                    </IconButton>)
                  }
                  <IconButton aria-label="Settings" onClick={() => this.showComponent(component)}>
                    <SettingsIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>,
            )}
          </List>
        </div>
      </div>

    );
  }

}

ComponentList.propTypes = {
  components: PropTypes.array.isRequired
};


export default withStyles(styles)(ComponentList);


