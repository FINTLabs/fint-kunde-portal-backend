import React, {Component} from "react";
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
import {Delete, Edit, InsertLink} from "@material-ui/icons";
import AutoHideNotification from "../../common/AutoHideNotification";
import AdapterView from "./view/AdapterView";
import {withContext} from "../../data/context/withContext";

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
  }
});

class AdapterList extends Component {
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
    const {currentOrganisation} = this.props.context;
    this.props.updateAdapter(adapter, currentOrganisation.name);
  };
  deleteAdapter = (adapter) => {
	const {currentOrganisation} = this.props.context;
    this.props.deleteAdapter(adapter, currentOrganisation.name);
    this.setState({
      notify: true,
      adapterDeletedName: adapter.name,
    });
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      adapters: this.props.adapters,
      adapterToEdit: null,
      open: false,
      notify: false,
      adapterDeletedName: null,
    };

  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={`Adapter ${this.state.adapterDeletedName} ble slettet!`}
          onClose={this.onCloseNotification}

        />
        <div className={classes.root}>
          <div className={classes.componentList}>
            <Typography variant="headline" className={classes.title}>Adapter</Typography>
            <Divider/>
            <List>
              {this.props.adapters.map((adapter) =>
                <ListItem className={classes.listItem} key={adapter.dn}>
                  <ListItemAvatar>
                    <Avatar className={classes.itemAvatar}>
                      <InsertLink/>
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
        />
      </div>
    );
  }

}

AdapterList.propTypes = {
  adapters: PropTypes.array.isRequired
};


export default withStyles(styles)(withContext(AdapterList));


