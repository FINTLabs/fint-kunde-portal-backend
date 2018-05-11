import React, {Component} from 'react';
import KlientView from './ClientView';
import PropTypes from 'prop-types';
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
import {Delete, Edit, ImportantDevices} from "material-ui-icons";
import AutoHideNotification from "../../common/AutoHideNotification";

const styles = theme => ({
  clientListContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  clientList: {
    width: '75%',
  },
  avtarstyle: {
    margin: 1,
    color: '#fff',
    backgroundColor: green[500],
  },
  title: {
    paddingLeft: theme.spacing.unit * 3,
  },
  listItem: {
    borderBottom: '1px dashed lightgray',
  },
  itemAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  }
});

class ClientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      klienter: this.props.klienter,
      clientToEdit: null,
      open: false,
      clientDeleted: false,
      clientDeletedName: null,
    };

  }

  editClient = (client) => {
    this.setState({
      open: true,
      clientToEdit: client,
    });
  };

  onCloseEdit = () => {
    this.setState({open: false});
  };

  updateClient = (client) => {
    this.props.updateClient(client);
  };

  deleteClient = (client) => {
    this.setState({
      clientDeleted: true,
      clientDeletedName: client.name,
    });
    this.props.deleteKlient(client);
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.clientDeleted}
          message={`Klient ${this.state.clientDeletedName} ble slettet!`}

        />
        <div className={classes.clientListContainer}>
          <div className={classes.clientList}>
            <Typography variant="headline" className={classes.title}>Klienter</Typography>
            <Divider/>
            <List>
              {this.props.klienter.map((klient) =>
                <ListItem className={classes.listItem} key={klient.dn}>
                  <ListItemAvatar>
                    <Avatar className={classes.itemAvatar}>
                      <ImportantDevices/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={klient.shortDescription}
                    secondary={klient.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={() => this.editClient(klient)}>
                      <Edit/>
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.deleteClient(klient)}>
                      <Delete/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </div>
        <KlientView
          open={this.state.open}
          client={this.state.clientToEdit}
          onClose={this.onCloseEdit}
          updateClient={this.updateClient}
        />
      </div>
    );
  }

}

ClientsList.propTypes = {
  klienter: PropTypes.array.isRequired
};


export default withStyles(styles)(ClientsList);


