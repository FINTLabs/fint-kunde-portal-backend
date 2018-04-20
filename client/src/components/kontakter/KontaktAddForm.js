import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';
import Button from 'material-ui/Button';
import {Grid} from "material-ui";
import TextField from 'material-ui/TextField';
import Kontakter from "../../kontakter/Kontakter";
import { BrowserRouter as Router, Route, Link, Redirect	} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';


class KontaktAddForm extends React.Component {
  constructor(props) {
    super(props);

  }
  
  submitForm(kontakt) {

	  this.props.createKontakt(kontakt)
	}
  render() {
	const {handleSubmit, submitForm} = this.props;
    return (
      <div>
      <form onSubmit={()=> this.submitForm()}>
	    <div>
	      <TextField
	      required
	      name="nin"
	      label="nin"
	      style={{ width: 350 }}
	      value={this.props.kontakt.nin}
	      onChange={this.props.onChange}
	      margin="normal"
	      /> 
	    </div>
      <div>
	        <TextField
	        name="firstName"
	        label="First Name"
	        style={{ width: 350 }}
	        value={this.props.kontakt.firstName}
	        onChange={this.props.onChange}
	        margin="normal"
        /> 
      </div>
      <div>         
	       <TextField
	         name="lastName"
	         label="Last Name"
	         style={{ width: 350 }}
	         value={this.props.kontakt.lastName}
	        onChange={this.props.onChange}/>
      </div>   
      <div>
	       <TextField
	       name="mail"
	       label="Mail"
	       style={{ width: 350 }}
	       value={this.props.kontakt.mail}
	       onChange={this.props.onChange}/>
     </div> 
     <div>  
	       <TextField
	       name="mobile"
	       label="Mobile"
	       style={{ width: 350 }}
	       value={this.props.kontakt.mobile}
	       onChange={this.props.onChange}/>
     </div>     

	    <Grid container style={{ lineHeight: '12px' }} spacing={6}>
   			<Grid item xs={6} sm={3}>
   				<Button variant="raised" style={{textTransform: 'none'}}  onClick={this.props.onSave} >Add Kontakt</Button>
   			</Grid>
   			<Grid item xs={6} sm={3}>
   				<Link to={{pathname: '/kontakts/kontakts'}} style={{ textDecoration: 'none' }}><Button variant="raised" style={{textTransform: 'none'}}>Cancel</Button></Link>
   			</Grid>
   		</Grid>
   
            		
        </form>
                
      </div>
  );
  }
}


export default KontaktAddForm;
