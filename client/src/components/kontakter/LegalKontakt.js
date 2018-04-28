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
import {green} from 'material-ui/colors';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const style = {
		  smallIcon: {
		    width: 25,
		    height: 19
		  },
		  small: {
		    width: 25,
		    height: 19
		  },
		  margin: 12,
		  root: {
		    width: '100%',
		    overflowX: 'auto',
		  },
		  table: {
		    minWidth: 700,
		  },
};
const avtarstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],

};
const CustomTableCell = withStyles(theme => ({
	  head: {
	    backgroundColor: theme.palette.common.black,
	    color: theme.palette.common.white,
	  },
	  body: {
	    fontSize: 14,
	  },
	}))(TableCell);

	const styles = theme => ({
	  root: {
	    width: '100%',
	    marginTop: theme.spacing.unit * 3,
	    overflowX: 'auto',
	  },
	  table: {
	    minWidth: 700,
	  },
	  row: {
	    '&:nth-of-type(odd)': {
	      backgroundColor: theme.palette.background.default,
	    },
	  },
	});

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
	            <TableBody>
	            	<TableRow>
	              		  	<TableCell><Link to={{pathname: '/kontakt', state: {kontakt : legalContact}}} style={{ textDecoration: 'none' }}><Button size="medium" style={{textTransform: 'none'}}>{legalContact.firstName} {legalContact.lastName}</Button></Link></TableCell>
	              		  	<TableCell numeric><Button size="medium" color="primary"onClick={() => {this.unsetLegalContact(legalContact)}} style={{textTransform: 'none'}}>Slett</Button></TableCell>
	              	</TableRow>
	            </TableBody>
	          </Table>

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
