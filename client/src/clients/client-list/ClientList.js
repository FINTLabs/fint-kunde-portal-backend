import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import FolderIcon from 'material-ui-icons/Folder';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,} from 'material-ui/List';
import {Avatar, IconButton, Paper} from "material-ui";

const styles = theme => ({
  root: {
    width: '100%',
  },
  list: {
    background: theme.palette.background.paper,
  }
});

const clients = [
  {
    "dn": "cn=testClient1,ou=clients,ou=test_org,ou=organisations,o=fint",
    "name": "testclient1",
    "note": "Test Client 1",
    "password": "password",
    "shortDescription": "This is a Test Client.",
    "assetId": "test.org",
    "clientId": "12345",
    "clientSecret": "aså93ru0a9sefnawh3r983hrv9a8wh3r98",
    "components": []
  },
  {
    "dn": "cn=testClient2,ou=clients,ou=test_org,ou=organisations,o=fint",
    "name": "testclient2",
    "note": "Test Client 2",
    "password": "password",
    "shortDescription": "This is a Test Client.",
    "assetId": "test.org",
    "clientId": "12345",
    "clientSecret": "aså93ru0a9sefnawh3r983hrv9a8wh3r98",
    "components": []
  }
];

class ClientList extends Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  edit = () => {

  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper>
          <List dense={true}>
            {
              clients.map(c => {
                  return (
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={c.name}
                        secondary={c.note}
                      />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Delete" onClick={() => alert('edit')}>
                          <EditIcon/>
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={() => alert('delete')}>
                          <DeleteIcon/>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                }
              )
            }
          </List>
        </Paper>


      </div>
    );
  }
}

ClientList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientList);
