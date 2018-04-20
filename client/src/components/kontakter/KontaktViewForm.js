import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';
import Button from 'material-ui/Button';
import {Grid} from "material-ui";
import TextField from 'material-ui/TextField';
import Kontakter from "../../kontakter/Kontakter";
import { BrowserRouter as Router, Route, Link, Redirect	} from 'react-router-dom';

class KontaktViewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		note : this.props.kontakt.note,
    		shortDescription : this.props.kontakt.shortDescription,
    		kontakt : this.props.kontakt,
    	    };

  }

  handleFirstNameChange = (event) => {
	    const field = event.target.name;
	    const kontakt = this.state.kontakt;
	    kontakt[field] = event.target.value;
	    this.setState({ firstName: event.target.value, kontakt: kontakt});

	  };

  handleLastNameChange = (event) => {
	    const field = event.target.name;
	    const kontakt = this.state.kontakt;
	    kontakt[field] = event.target.value;
		this.setState({ lastName: event.target.value, kontakt: kontakt});

	  };

  handleMailChange = (event) => {
	    const field = event.target.name;
	    const kontakt = this.state.kontakt;
	    kontakt[field] = event.target.value;
		this.setState({ mail: event.target.value, kontakt: kontakt});

	  };
	  
  handleMobileChange = (event) => {
		    const field = event.target.name;
		    const kontakt = this.state.kontakt;
		    kontakt[field] = event.target.value;
			this.setState({ mobile: event.target.value, kontakt: kontakt});

	};		  
	  
  submitForm(kontakt) {
	  this.props.updateKontakt(kontakt)
	}

  render() {
	const {handleSubmit, submitForm} = this.props;
    return (
      <div>
        <form onSubmit={()=> this.submitForm()}>
	    <div>
	      <TextField
	      id="nin"
	      label="nin"
	      style={{ width: 350 }}
	      value={this.state.kontakt.nin}
	      disabled
	      margin="normal"
	      /> 
	    </div>
        <div>
          <TextField
          name="firstName"
          label="First Name"
          style={{ width: 350 }}
          value={this.state.kontakt.firstName}
          onChange={this.handleFirstNameChange}
          margin="normal"
          /> 
        </div>
        <div>         
         <TextField
           name="lastName"
           label="Last Name"
           style={{ width: 350 }}
           value={this.state.kontakt.lastName}
           onChange={this.handleLastNameChange}/>
        </div>   
        <div>
         <TextField
         name="mail"
         label="Mail"
         style={{ width: 350 }}
         value={this.state.kontakt.mail}
         onChange={this.handleMailChange}/>
       </div> 
       <div>  
         <TextField
         name="mobile"
         label="Mobile"
         style={{ width: 350 }}
         value={this.state.kontakt.mobile}
         onChange={this.handleMobileChange}/>
       </div>     

     	<Grid container style={{ lineHeight: '12px' }} spacing={6}>
 			<Grid item xs={6} sm={4}>
 				<Button variant="raised" style={{textTransform: 'none'}}  onClick={this.props.onSave} >Update Kontakt</Button>
 			</Grid>
 			<Grid item xs={6} sm={2}>
 				<Link to={{pathname: '/kontakter/kontakter'}} style={{ textDecoration: 'none' }}><Button variant="raised" style={{textTransform: 'none'}}>Cancel</Button></Link>
 			</Grid>
 		</Grid>
 		<Route path='/kontakter/kontakter' component={Kontakter}/>
        </form>
      </div>
  );
  }
}

KontaktViewForm.propTypes = {
		  kontakt: PropTypes.object.isRequired,
		  onSave: PropTypes.func.isRequired,
		  onChange: PropTypes.func.isRequired,
		  saving: PropTypes.bool
		};

export default KontaktViewForm;
