import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import {fetchLegalContact, unsetLegalContact, setLegalContact} from '../../actions/apisAction';
import DashboardIcon from 'material-ui-icons/Home';
import KontaktView from './KontaktView';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography, withStyles} from "material-ui";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {green} from 'material-ui/colors';

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

const buttonstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],
        textDecoration: 'none',
        textTransform: 'none',

};
const linkstyle = {
        margin: 1,
        textDecoration: 'none',
        textTransform: 'none',
        align: 'left'

};

class LegalKontakt extends Component {
	constructor(props) {
	    super(props);
	    this.unsetLegalContact= this.unsetLegalContact.bind(this);
	    this.state = {legalContact: this.props.legalContact};
	}
    componentDidMount(){
  	   this.props.fetchLegalContact();
	   
    }

	unsetLegalContact(kontakt) {
		 this.props.unsetLegalContact(kontakt)
	}
	

	render () {
		console.log("props")
		console.log(this.state)
	    if (!this.props.legalContact) {
	      return (
	    		  <div>
		                <TextField id="text-field-default" defaultValue="Juridisk Kontakt"/><br></br>
	              		<p> Ingen definert juridisk kontakt ....</p>
	              </div>
	      );
	    } else {
	      return this.renderPosts();
	    }
	  }

	renderPosts () {
	    const legalContact = this.props.legalContact;
	    console.log("legalcontact")
	    console.log(this.props.legalContact)
	    console.log(legalContact)
	    return (
	    <Router>
	     <div>
	  	  	<Table >
	            <TableHead>
	                <TextField id="text-field-default" defaultValue="Juridisk Kontakt"/>
	            </TableHead>
	          </Table>
	            <Grid container style={{ lineHeight: '4px' }} spacing={8}>
	         		<Grid item xs={12} sm={6}>
	         			<Link to={{pathname: '/kontakt', state: {kontakt : legalContact}}} style={{ textDecoration: 'none' }}><Button style={linkstyle}>{legalContact.firstName} {legalContact.lastName}</Button></Link>
	         		</Grid>
	         		<Grid item xs={12} sm={2}>
	         			<Button bsStyle="primary" onClick={() => this.unsetLegalContact(legalContact)} style={buttonstyle}>Slett</Button>
	         		</Grid>
	         		<Grid item xs={12} sm={2}>
         			</Grid>
	            </Grid>	

	      <Route
	      	path="/kontakt"
	      	render={({ state }) => (
	        <KontaktView kontakt={this.state.kontakt} />
	        )}
	      />
	    </div>
	  </Router>
	    );
	  }

}
	
function mapStateToProps(state){
	return {
        posts: state.posts,
        legalContact: state.legalContact
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({ fetchLegalContact: fetchLegalContact, unsetLegalContact: unsetLegalContact}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(LegalKontakt));
