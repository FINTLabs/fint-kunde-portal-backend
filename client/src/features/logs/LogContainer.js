import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle,} from "@material-ui/core";
import LogApi from "../../data/api/LogApi";
import LogList from "./LogList";
import {
  Avatar,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  withStyles
} from "@material-ui/core";

import OrganisationApi from "../../data/api/OrganisationApi";
import InformationMessageBox from "../../common/InformationMessageBox";
import PropTypes from "prop-types";

import {withContext} from "../../data/context/withContext";

const styles = (theme) => ({
  addButton: {
    margin: 0,
    top: 100,
    left: 'auto',
    bottom: 'auto',
    right: 50,
    position: 'fixed',
  },
  root: {},
  dialog: {
    height: '75%',
  },
  contactList: {
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
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

  searchInput: {
    margin: theme.spacing.unit,
    width: '80%',
  },


});

class LogContainer extends React.Component {


  onSearch = (searchString) => {
    let logs = this.props.logs;
  };



  onChangeSearch = (event) => {
    this.setState({
      searchString: event.target.value,
    });
  };


  constructor(props, context) {
    super(props, context);
    this.state = {
      log: [],
      searchString: '',
      message: '',
    };
  }
  
  searchLog = () => {
	    LogApi.fetchLog("pwf.no", this.state.searchString)
	      .then(response => {
	        this.setState({log: response[1].data});
	      })
  };
	  
  render() {
	 
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <InformationMessageBox
          message={this.state.message}
        />
            <Input
              autoFocus
              value={this.state.searchString}
              className={classes.searchInput}
              inputProps={{
                'aria-label': 'Log',
              }}
              onChange={this.onChangeSearch}
              onKeyUp={() => this.onSearch(this.state.query)}
            />
        	<Button onClick={() => this.searchLog(this.state.query)}  color="primary">
        		Søk i log
        	</Button>
		      <div className={classes.root}>
		        <LogList
		          log={this.state.log}
		        />
		      </div>	

      </div>
    )
  }
}


LogContainer.propTypes = {
  classes: PropTypes.any.isRequired,
  logs: PropTypes.any.isRequired,
  fetchLog: PropTypes.any.isRequired,
  notify: PropTypes.any.isRequired
};

export default withStyles(styles)(withContext(LogContainer));







