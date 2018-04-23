import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {viewOrganisation} from '../../actions/apisAction';
import {BrowserRouter as Router, Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography, withStyles} from "material-ui";
import TextField from 'material-ui/TextField';
import OrgView from './OrgView';

const styles = theme => ({
	  button: {
	    margin: theme.spacing.unit,
	    textTransform: 'none'
	  },
	});

//class ApiLink extends React.Component {
//  constructor(props, context) {
//    super(props, context);
//    organisation: Object.assign({}, this.props.location.state.organisation);
//  }
//  
//  componentDidMount() {
//	  this.setState({ open: true });
//  }
//  
//   componentWillReceiveProps(nextProps) {
//    if (this.props.organisation != nextProps.klient) {
//      this.setState({organisation: Object.assign({}, nextProps.organisation)});
//
//    }
//
//    state = {
//		    open: false,
//		  };
//	handleClickOpen = () => {
//		    this.setState({ open: true });
//		  };
//
//  handleClose = () => {
//      this.setState({ open: false });
//
//  };
//    render() {
//        return (
//		    <Router>
//	  			<div>
//	  				<h1>Organisation</h1>
//	  	         	<Grid container style={{ lineHeight: '5px' }} spacing={24}>
//	  	         		<Grid item xs={12} sm={7}>
//	  	         			<li className="list-group-item" ><Link to={{pathname: '/api', state: {organisation : organisation}}} style={{ textDecoration: 'none' }}>{organisation.name}</Link></li>
//	  	         		</Grid>
//	  	         	</Grid>
//				</div>
//
//	  				)}
//
//		      <Route
//		      	path="/api"
//		      	render={({ state }) => (
//		        <OrgView api={this.state.organisation} />
//		        )}
//		      />
//		  </Router>
//		    );
//		  }
//
//	}
//
//	ApiLink.propTypes = {
//			organisation: PropTypes.object.isRequired
//		};
//
//	function mapStateToProps(state){
//		return {
//	  }
//	}
//	function  matchDispatchToProps(dispatch){
//	    return bindActionCreators({fetchOrganisation : fetchOrganisation}, dispatch);
//	}
//
//	export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ApiLink));
//
//
class OrgList extends React.Component {
	constructor(props) {
	    super(props);
	    console.log("test");
	    console.log(this.props)
	    this.state = {organisation: this.props.organisation};
	    console.log(this.state)
	}


	render () {
	  return (
	    <Router>
	     <div>
  			<h1>Organistaion</h1>
  			<ul className="list-group">
				{this.props.organisation.map((organisation, i) => 
			<div>
	         	<Grid container style={{ lineHeight: '5px' }} spacing={24}>
	         		<Grid item xs={12} sm={7}>
	         			<li className="list-group-item" key={i}><Link to={{pathname: '/api', state: {organisation : organisation}}} style={{ textDecoration: 'none' }}>{organisation.name}</Link></li>
	         		</Grid>
	         	</Grid>
		</div>

				)}
      </ul>

	      <Route
	      	path="/organisation"
	      	render={({ state }) => (
	        <OrgView organisation={this.props.organisation} />
	        )}
	      />
	    </div>
	  </Router>
	    );
	  }

}
	
OrgList.propTypes = {
		organisation: PropTypes.object.isRequired
	};

function mapStateToProps(state){
	return {
  }
}
//function  matchDispatchToProps(dispatch){
//    return bindActionCreators({viewOrganisation : viewOrganisation}, dispatch);
//}

export default withRouter(connect(mapStateToProps)(OrgList));


