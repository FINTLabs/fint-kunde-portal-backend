import React from "react";
import Button from "@material-ui/core/Button";
import LogApi from "../../data/api/LogApi";
import LogList from "./LogList";
import { Input,  withStyles, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import LoadingProgress from "../../common/LoadingProgress";
import {withContext} from "../../data/context/withContext";
import Search from "@material-ui/icons/Search";

const styles = (theme) => ({
  root: {
	    display: 'flex',
	    justifyContent: 'center',
  },
  title: {
    paddingLeft: theme.spacing.unit * 50,
    paddingBottom: theme.spacing.unit,
  },
  searchInput: {
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
      loading: false,
    };
  }
  
  searchLog = () => {
	this.setState({
      loading: true,
    });
    LogApi.fetchLog("pwf.no", this.state.searchString)
      .then(response => {
        this.setState({
        	log: response[1].data,
        	loading: false,
        });
      })
  };
	  
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Typography variant="headline" className={classes.title}>Logs</Typography>
        <div className={classes.root}>
	        <Input
	          autoFocus
	          value={this.state.searchString}
	          className={classes.searchInput}
	          placeholder= "Søk etter log"
	          onChange={this.onChangeSearch}
	          onKeyUp={() => this.onSearch(this.state.query)}
	        />
	    	<Button onClick={() => this.searchLog(this.state.query)}  color="primary">
	    		<Search/>
	    	</Button>
    	</div>
        <div className={classes.root}>
          <LogList
            log={this.state.log}
            loading={this.state.loading}
          />
        </div>	
      </div>
    )
  }
}


LogContainer.propTypes = {
  classes: PropTypes.any.isRequired,
  log: PropTypes.any.isRequired,
  fetchLog: PropTypes.any.isRequired,
  loading: PropTypes.any.isRequired
};

export default withStyles(styles)(withContext(LogContainer));







