import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';
import Button from 'material-ui/Button';
import {Grid} from "material-ui";
import TextField from 'material-ui/TextField';
import Klienter from "../../klienter/Klienter";
import { BrowserRouter as Router, Route, Link, Redirect	} from 'react-router-dom';

class KlientAddForm extends React.Component {
  constructor(props) {
    super(props);

  }
  
  submitForm(klient) {
	  this.props.createKlient(klient)
	}

  render() {
	const {handleSubmit, submitForm} = this.props;
    return (
      <div>
      <form onSubmit={()=> this.submitForm()}>
      <div>
      <TextField
	      required
	      name="name"
	      label="Klient Name"
	      style={{ width: 350 }}
	      value={this.props.klient.name}
	      onChange={this.props.onChange}
	      margin="normal"
      /> 
    </div>
    <div>         
	  <TextField
	  	name="note"
	  	label="Note"
        style={{ width: 350 }}
	  	value={this.props.klient.note}
	  	onChange={this.props.onChange}/>
    </div>   
    <div>         
    	<TextField
    	   name="shortDescription"
    	   label="ShortDescription"
    	   multiline
           rows="4"
           style={{ width: 350 }}
           value={this.props.klient.shortDescription}
    	onChange={this.props.onChange}/>
     </div>      


       	<Grid container style={{ lineHeight: '12px' }} spacing={6}>
   			<Grid item xs={6} sm={3}>
   				<Button variant="raised" style={{textTransform: 'none'}}  onClick={this.props.onSave} >Add Klient</Button>
   			</Grid>
   			<Grid item xs={6} sm={3}>
   				<Link to={{pathname: '/klienter/klienter'}} style={{ textDecoration: 'none' }}><Button variant="raised" style={{textTransform: 'none'}}>Cancel</Button></Link>
   			</Grid>
   		</Grid>
            		
        </form>
                
      </div>
  );
  }
}



export default KlientAddForm;
