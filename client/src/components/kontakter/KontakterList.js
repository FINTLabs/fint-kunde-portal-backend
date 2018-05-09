import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, withRouter	} from 'react-router-dom';
import {fetchLegalContact, removeTechnicalContact, unsetLegalContact, setLegalContact} from '../../actions/apisAction';
import DashboardIcon from 'material-ui-icons/Home';
import KontaktView from './KontaktView';
import LegalKontakt from './LegalKontakt';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {Avatar,CardHeader, Grid} from "material-ui";
import Table, { TableHead } from 'material-ui/Table';
import {green} from 'material-ui/colors';

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
  			<h3>Kontakter</h3>
  			<LegalKontakt />
  		<Table >
          <TableHead>
              <TextField id="text-field-default" defaultValue="Teknisk Kontakter"/>
          </TableHead>
       </Table>
       {this.props.technicalContacts.map((kontakt, i) =>  {
           return (
				<Grid container style={{ lineHeight: '4px' }} spacing={8}>
					<Grid item xs={12} sm={6}>
						<Link to={{pathname: '/kontakt', state: {kontakt : kontakt}}} style={{ textDecoration: 'none' }}><Button style={linkstyle}>{kontakt.firstName} {kontakt.lastName}</Button></Link>
					</Grid>
					<Grid item xs={12} sm={2}>
						<Button bsStyle="primary" onClick={() => this.removeTechnicalContact(kontakt)} style={buttonstyle}>Slett</Button>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Button bsStyle="primary" onClick={() => this.setLegalContact(kontakt)} style={buttonstyle}>Sett som juridisk kontakt</Button>
					</Grid>
			   </Grid>
           );
         })}
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


