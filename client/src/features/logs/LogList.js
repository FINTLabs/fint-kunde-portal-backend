import React, {Component} from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
	  Avatar,
	  IconButton,
	  Typography,
	  withStyles
	} from "@material-ui/core";

const styles = theme => ({
	  root: {
	    width: '50%',
	  },
	  heading: {
	    fontSize: theme.typography.pxToRem(15),
	    fontWeight: theme.typography.fontWeightRegular,
	  },
	  details: {
		    fontSize: theme.typography.pxToRem(15),
		    fontWeight: theme.typography.fontWeightRegular,
	  },
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
      <div className={classes.root}>
        {this.props.log.map((log) =>
	      <ExpansionPanel>   
	        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
	          <Typography className={classes.heading}>{log.corrId}</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails className={classes.details}>
	          	action:{log.currentEvent.action} status: {log.currentEvent.status}, time: {log.currentEvent.time}, orgId: {log.currentEvent.orgId}
	        </ExpansionPanelDetails>
	      </ExpansionPanel>
        )}
 
    </div>
    );
 }
}


export default withStyles(styles)(LogList);
