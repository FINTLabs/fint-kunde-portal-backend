import React, {Component} from 'react';
import AdapterView from './AdapterView';
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
  },
  listItem: {
    borderBottom: '1px dashed lightgray',
  },
  itemAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  }
});

class AdaptersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adapters: this.props.adapters,
      adapterToEdit: null,
      open: false,
      adapterDeleted: false,
      adapterDeletedName: null,
    };

  }

  editAdapter = (adapter) => {
    this.setState({
      open: true,
      adapterToEdit: adapter,
    });
  };

  onCloseEdit = () => {
    this.setState({open: false});
  };

  updateAdapter = (adapter) => {
    this.props.updateAdapter(adapter, this.context.organisation);
  };

  addAdapterToComponent = (adapter) => {
    this.props.addAdapterToComponent(adapter, this.context.organisation);
  };
  deleteAdapterFromComponent = (adapter) => {
    this.props.deleteAdapterfromComponent(adapter, this.context.organisation);
  };
  fetchComponents = () => {
    this.props.fetchComponents();
  };
  deleteAdapter = (adapter) => {
    this.setState({
      adapterDeleted: true,
      adapterDeletedName: adapter.name,
    });
    this.props.deleteAdapter(adapter, this.context.organisation);
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.adapterDeleted}
          message={`Adapter ${this.state.adapterDeletedName} ble slettet!`}

        />
        <div className={classes.adapterListContainer}>
          <div className={classes.adapterList}>
            <Typography variant="headline" className={classes.title}>Adapterer</Typography>
            <Divider/>
            <List>
              {this.props.adapters.map((adapter) =>
                <ListItem className={classes.listItem} key={adapter.name}>
                  <ListItemAvatar>
                    <Avatar className={classes.itemAvatar}>
                      <ImportantDevices/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={adapter.shortDescription}
                    secondary={adapter.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={() => this.editAdapter(adapter)}>
                      <Edit/>
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.deleteAdapter(adapter)}>
                      <Delete/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>

          </div>
        </div>
        <AdapterView
          open={this.state.open}
          adapter={this.state.adapterToEdit}
          onClose={this.onCloseEdit}
          updateAdapter={this.updateAdapter}
          addAdapterToComponent={this.addAdapterToComponent}
          deleteAdapterFromComponent={this.deleteAdapterfromComponent}
          fetchComponents={this.fetchComponents}
        />
      </div>
    );
  }

}

AdaptersList.propTypes = {
  adapters: PropTypes.array.isRequired
};

export default withStyles(styles)(AdaptersList);

