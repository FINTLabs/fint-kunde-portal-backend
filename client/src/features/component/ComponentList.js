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
import {green} from 'material-ui/colors';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import ComponentIcon from '@material-ui/icons/WebAsset';
import OrganisationApi from "../../data/api/OrganisationApi";
import MessageDialog from "./message-dialog/MessageDialog";
import AutoHideNotification from "../../common/AutoHideNotification";
import PropTypes from 'prop-types';
import ComponentsView from "./ComponentsView";


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
    color: theme.palette.primary.main,
  },
});

class ComponentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      message: null,
      component: null,
      notify: false,
      notifyMessage: null,
      showComponent: false,
    };
  }

  askToLinkComponent = (component) => {
    this.setState({
      showMessage: true,
      message: "Vil du legge til komponenten:  " + component.description + " til organisasjonen?",
      component: component,
    });
  };

  askToUnLinkComponent = (component) => {
    this.setState({
      showMessage: true,
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

  onCloseMessage = (confirmed) => {
    this.setState({
      showMessage: false,
    });

    if (this.isLinkedToOrganisation(this.state.component) && confirmed) {
      this.unlinkComponent(this.state.component);
    }
    if (confirmed) {
      this.linkComponent(this.state.component);
    }
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
      notifyMessage: null,
    });
  };

  showComponent = (component) => {
    console.log("showcomponent");
    console.log(component);
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

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <MessageDialog
          show={this.state.showMessage}
          message={this.state.message}
          onClose={this.onCloseMessage}
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


