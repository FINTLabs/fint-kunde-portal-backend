import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';
import Button from 'material-ui/Button';
import {Grid} from "material-ui";
import TextField from 'material-ui/TextField';

class AdapterForm extends React.Component {
  constructor(props) {
    super(props);

  }
  
  submitForm(adapter) {
	  this.props.createAdapter(adapter)
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
      label="Adapter Name"
      style={{ width: 350 }}
      value={this.props.adapter.name}
      onChange={this.props.onChange}
      margin="normal"
      /> 
    </div>
    <div>         
	  <TextField
	  	name="note"
	  	label="Note"
        style={{ width: 350 }}
	  	value={this.props.adapter.note}
	  	onChange={this.props.onChange}/>
    </div>   
    <div>         
    	<TextField
    	   name="shortDescription"
    	   label="ShortDescription"
    	   multiline
           rows="4"
           style={{ width: 350 }}
           value={this.props.adapter.shortDescription}
    	onChange={this.props.onChange}/>
     </div>      


       	<Grid container style={{ lineHeight: '12px' }} spacing={6}>
   			<Grid item xs={6} sm={3}>
   				<Button variant="raised" style={{textTransform: 'none'}}  onClick={this.props.onSave} >Add Adapter</Button>
   			</Grid>
   			<Grid item xs={6} sm={3}>
   				<a href="/adapters/adapters" style={{ textDecoration: 'none' }}><Button variant="raised" style={{textTransform: 'none'}}>Cancel</Button></a>
   			</Grid>
   		</Grid>
            		
        </form>
                
      </div>
  );
  }
}



export default AdapterForm;
