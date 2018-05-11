import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import {linkComponent} from '../../actions/apisAction';
import DashboardIcon from 'material-ui-icons/Home';
import ApiView from './ApiView';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography, withStyles} from "material-ui";
import {green} from 'material-ui/colors';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';

const styles = {
		  smallIcon: {
		    width: 25,
		    height: 19
		  },
		  small: {
		    width: 25,
		    height: 19
		  },
		  margin: 12,
};
const avtarstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],

};
class OrgComponentsLink extends Component {
	constructor(props, context) {
    super(props);
    this.state = {components: this.props.components};
 //   this.linkComponent = this.linkComponent.bind(this);
//    this.unlinkComponent = this.unlinkComponent.bind(this);

  }

  componentDidMount() {
	  this.setState({ open: true });
  }
  
   componentWillReceiveProps(nextProps) {
    if (this.props.components != nextProps.components) {
      this.setState({components: Object.assign({}, nextProps.components)});

    }

    this.setState({saving: false, isAdding: false});
  }
   state = {
		    open: false,
		  };
 handleClickOpen = () => {
		    this.setState({ open: true });
		  };

  handleClose = () => {
      this.setState({ open: false });
	    //eslint-disable-next-line
      location.assign("/apis/apis");
  };
  
  handleCloseLink = () => {
	  this.linkComponent(this.state.api)
      this.setState({ open: false });

  };
  handleCloseUnlink = () => {
//	  this.unlinkComponent(this.state.api)
      this.setState({ open: false });

  };

	render () {
	  return (

	     <div>
	        <Dialog
	        	fullWidth={true}
	        	maxWidth = {'md'}
	          open={this.state.open}
	          onClose={this.handleClose}
	          aria-labelledby="form-dialog-title"
	        >
	          <DialogTitle id="form-dialog-title">Components</DialogTitle>
	          <DialogContent>
	          		{this.state.components.map((component, i) => 
	          		<Grid container style={{ lineHeight: '15px' }} spacing={24}>
  	         			<Grid item xs={12} sm={6}>
  	         				{component.name}
         				</Grid>
    	         		<Grid item xs={6} sm={6}>
    	         				<Button onClick={this.handleCloseLink} color="primary" style={{textTransform: 'none'}}>Link</Button>
    	    	         </Grid>  	         		
    	    	  	 </Grid>
	          		)}
			  </DialogContent>
	          <DialogActions>
	            <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
	            	Avbryt
	            </Button>

	          </DialogActions>
	        </Dialog>
	    </div>

	    );
	  }

}

OrgComponentsLink.propTypes = {
		components: PropTypes.array.isRequired
	};

function mapStateToProps(state){
	return {
  }
}


export default withRouter(connect(mapStateToProps)(OrgComponentsLink));



