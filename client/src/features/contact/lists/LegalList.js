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
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ContactIcon from "@material-ui/icons/Person";
import blue from "@material-ui/core/colors/blue";
import ContactView from "../view/ContactView";


const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 5,
  },
  legalContactList: {
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

class LegalList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {showContact: false};
  }

  showContact = () => {
    this.setState({
      showContact: true,
    });

  };

  onCloseContactView = () => {
    this.setState({
      showContact: false,
      //contact: null,
    });
  };



  render() {
    const {classes, legalContact} = this.props;
    return (
      <div className={classes.root}>
        <ContactView
          contact={legalContact}
          onClose={this.onCloseContactView}
          show={this.state.showContact}
          notify={this.props.notify}
        />
        <div className={classes.legalContactList}>
          <Typography variant="headline" className={classes.title}>Juridisk kontakt</Typography>
          <Divider/>
          <List>
            <ListItem className={classes.listItem} key={legalContact.dn}>
              <ListItemAvatar>
                <Avatar className={classes.itemAvatar}>
                  <ContactIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={legalContact.firstName}
                secondary={legalContact.lastName}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Settings" onClick={() => this.showContact()}>
                  <SettingsIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

        </div>
      </div>
    );
  }
}

LegalList.propTypes = {
  legalContact: PropTypes.object.isRequired,
};
export default withStyles(styles)(LegalList);
