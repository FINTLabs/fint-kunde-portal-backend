import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import {fetchLegalContact, removeTechnicalContact, unsetLegalContact, setLegalContact} from '../../actions/apisAction';
import DashboardIcon from 'material-ui-icons/Home';
import KontaktView from './KontaktView';
import LegalKontakt from './LegalKontakt';
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

class KontakterList extends Component {
	constructor(props) {
	    super(props);
	    this.removeTechnicalContact= this.removeTechnicalContact.bind(this);
	    this.unsetLegalContact= this.unsetLegalContact.bind(this);
	    this.setLegalContact= this.setLegalContact.bind(this);
	    this.state = {kontakter: this.props.kontakter,
	    		technicalContacts: this.props.technicalContacts,
	    		legalContact: this.props.legalContact};
	}
    componentDidMount(){
  	   this.props.fetchLegalContact();
	   
    }

	removeTechnicalContact(kontakt) {
		 this.props.removeTechnicalContact(kontakt)
	}
	
	unsetLegalContact(kontakt) {
		 this.props.unsetLegalContact(kontakt)
	}
	
	setLegalContact(kontakt) {
		 this.props.setLegalContact(kontakt)
	}	
	render () {
	  return (
	    <Router>
	     <div>
      		<a href="/" style={{textDecoration:'none'}}><CardHeader	title="Dashboard" avatar={
                <Avatar style={avtarstyle}>
                    <DashboardIcon/>
                </Avatar>}/></a>
  			<h3>Kontakter</h3>

  		<LegalKontakt />  
  		<Table >
          <TableHead>
              <TextField id="text-field-default" defaultValue="Teknisk Kontakter"/>
          </TableHead>
          <TableBody>
          {this.props.technicalContacts.map((kontakt, i) =>  {
              return (
            		  <TableRow  key={i}>
            		  	<TableCell><Link to={{pathname: '/kontakt', state: {kontakt : kontakt}}} style={{ textDecoration: 'none' }}><Button size="medium" style={{textTransform: 'none'}}>{kontakt.firstName} {kontakt.lastName}</Button></Link></TableCell>
            		  	<TableCell numeric><Button size="medium" color="primary"onClick={() => {this.removeTechnicalContact(kontakt)}} style={{textTransform: 'none'}}>Slett</Button></TableCell>
            		  	<TableCell numeric><Button size="medium" color="primary"onClick={() => {this.setLegalContact(kontakt)}} style={{textTransform: 'none'}}>Juridisk</Button></TableCell>
            		  </TableRow>
              );
            })}
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
	
KontakterList.propTypes = {
	  kontakter: PropTypes.array.isRequired
	};

function mapStateToProps(state){
	return {
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchLegalContact: fetchLegalContact, setLegalContact : setLegalContact, unsetLegalContact : unsetLegalContact, removeTechnicalContact: removeTechnicalContact}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontakterList));


