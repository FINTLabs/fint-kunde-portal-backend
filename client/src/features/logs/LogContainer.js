import React from "react";
import Button from "@material-ui/core/Button";
import LogApi from "../../data/api/LogApi";
import LogList from "./LogList";
import { Input,  withStyles} from "@material-ui/core";
import InformationMessageBox from "../../common/InformationMessageBox";
import PropTypes from "prop-types";
import LoadingProgress from "../../common/LoadingProgress";
import {withContext} from "../../data/context/withContext";
import Search from "@material-ui/icons/Search";

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
    width: '50%',
  },


});

class LogContainer extends React.Component {


  onSearch = (searchString) => {
    let log = this.props.log;
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
	  	  console.log(response) 
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
        		<Search/>
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







