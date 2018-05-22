import React from "react";
import PropTypes from "prop-types";
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
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactIcon from '@material-ui/icons/Person';
import SetLegalIcon from "@material-ui/icons/AccountBalance";
import blue from "material-ui/colors/blue";
import OrganisationApi from "../../../data/api/OrganisationApi";
import WarningMessageBox from "../../../common/WarningMessageBox";
import ContactView from "../view/ContactView";


const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  technicalContactList: {
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
  removeIcon: {
    color: theme.palette.primary.light,
  },
  setLegalIcon: {
    color: blue[700],
  },
});

class TechnicalList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      askToRemoveContact: false,
      showContact: false,
      contact: {},
      message: ''
    };
  }

  askToRemoveContact = (contact) => {
    this.setState({
      askToRemoveContact: true,
      message: `Er du sikker på at du vil fjerne ${contact.firstName} ${contact.lastName} fra organisasjonen?`,
      contact: contact,
    });
  };

  onCloseRemoveContact = (confirmed) => {
    this.setState({
      askToRemoveContact: false,
    });

    if (confirmed) {
      this.removeContact(this.state.contact);
    }
  };

  removeContact = (contact) => {
    OrganisationApi.removeTechnicalContact(contact).then(response => {
      this.props.notify(`${contact.firstName} ${contact.lastName} ble fjernet.`);
      this.props.fetchTechnicalContacts();
    }).catch(error => {
      alert(error);
    });
  };

  showContact = (contact) => {
    this.setState({
      contact: contact,
      showContact: true,
    });

  };

  onCloseContactView = () => {
    this.setState({
      showContact: false,
      //contact: null,
    });
  };

  setLegalContact = (contact) => {
    OrganisationApi.setLegalContact(contact)
      .then(() => {
        this.props.notify("Juridisk ansvarlig er oppdatert.");
        this.props.afterUpdateLegalContact();

      })
      .catch(error => {
      });
  };

  render() {
    const {classes, technicalContacts} = this.props;
    return (
      <div className={classes.root}>
        <WarningMessageBox
          show={this.state.askToRemoveContact}
          message={this.state.message}
          onClose={this.onCloseRemoveContact}
        />
        <ContactView
          contact={this.state.contact}
          onClose={this.onCloseContactView}
          show={this.state.showContact}
          notify={this.props.notify}
        />
        <div className={classes.technicalContactList}>
          <Typography variant="headline" className={classes.title}>Teknisk kontakter</Typography>
          <Divider/>
          <List>
            {technicalContacts.map((contact) =>
              <ListItem className={classes.listItem} key={contact.dn}>
                <ListItemAvatar>
                  <Avatar className={classes.itemAvatar}>
                    <ContactIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={contact.firstName}
                  secondary={contact.lastName}
                />
                <ListItemSecondaryAction>

                  <IconButton aria-label="Remove" onClick={() => this.askToRemoveContact(contact)}>
                    <RemoveIcon className={classes.removeIcon}/>
                  </IconButton>
                  <IconButton aria-label="Legal" onClick={() => this.setLegalContact(contact)}>
                    <SetLegalIcon className={classes.setLegalIcon}/>
                  </IconButton>
                  <IconButton aria-label="Settings" onClick={() => this.showContact(contact)}>
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

TechnicalList.propTypes = {
  afterUpdateLegalContact: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,
  fetchTechnicalContacts: PropTypes.any.isRequired,
  notify: PropTypes.any.isRequired,
  technicalContacts: PropTypes.array.isRequired
}
export default withStyles(styles)(TechnicalList);
