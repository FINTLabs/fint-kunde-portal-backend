import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';
import Button from 'material-ui/Button';
import {Grid} from "material-ui";
import TextField from 'material-ui/TextField';

class KlientViewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		note : this.props.klient.note,
    		shortDescription : this.props.klient.shortDescription,
    		klient : this.props.klient,
    	    };

  }

  handleNoteChange = (event) => {
	    const field = event.target.name;
	    const klient = this.state.klient;
	    klient[field] = event.target.value;
	    this.setState({ note: event.target.value, klient: klient});

	  };

  handleShortDescriptionChange = (event) => {
	    const field = event.target.name;
	    const klient = this.state.klient;
	    klient[field] = event.target.value;
		this.setState({ shortDescription: event.target.value, klient: klient});

	  };
	  
	  
  submitForm(klient) {
	  this.props.updateKlient(klient)
	}

  render() {
	  
	const {handleSubmit, submitForm} = this.props;
    return (
    	   
      <div>
      <form onSubmit={()=> this.submitForm()}>

	   <div>
	      <TextField
	      id="name"
	      label="Name"
	      style={{ width: 350 }}
	      value={this.props.klient.name}
	      disabled
	      margin="normal"
	      /> 
	    </div>
        <div>
          <TextField
          name="note"
          label="Note"
          style={{ width: 350 }}
          value={this.props.klient.note}
          onChange={this.handleNoteChange}
          margin="normal"
          /> 
        </div>
        <div>         
         <TextField
           name="shortDescription"
           label="ShortDescription"
        	   multiline
               rows="4"
           style={{ width: 350 }}
           value={this.props.klient.shortDescription}
           onChange={this.handleShortDescriptionChange}/>
         </div>          

     	<Grid container style={{ lineHeight: '12px' }} spacing={6}>
 			<Grid item xs={6} sm={4}>
 				<Button variant="raised" style={{textTransform: 'none'}}  onClick={this.props.onSave} >Update Klient</Button>
 			</Grid>
 			<Grid item xs={6} sm={2}>
 				<a href="/klienter/klienter" style={{ textDecoration: 'none' }}><Button variant="raised" style={{textTransform: 'none'}}>Cancel</Button></a>
 			</Grid>
 		</Grid>

        </form>
      </div>
  );
  }
}


export default KlientViewForm;
