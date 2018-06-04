import React, {Component} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import LogIcon from "@material-ui/icons/Receipt";
import LogApi from "../../data/api/LogApi";
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

const styles = (theme) => ({
  createContactButton: {
    margin: theme.spacing.unit,
    top: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
    position: 'absolute',
  },
  dialogContent: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  }
});

class LogList extends Component {


  constructor(props) {
    super(props);
    this.state = {
      log: {},
      open: false,
    };
  }

  render() {
    const {classes} = this.props;
    return (
     <div className={classes.logList}>
      <List>
        {this.props.log.map((log) =>
          <ListItem className={classes.listItem} key={log.corrId}>
            <ListItemAvatar>
              <Avatar className={classes.itemAvatar}>
                <LogIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={log.corrId}
            />
          </ListItem>,
        )}
      </List>
    </div>
    );
  }

}


export default withStyles(styles)(LogList);
