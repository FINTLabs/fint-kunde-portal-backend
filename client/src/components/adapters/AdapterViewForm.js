import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';
import Button from 'material-ui/Button';
import {Grid} from "material-ui";
import TextField from 'material-ui/TextField';
import Adapters from "../../adapters/Adapters";
import { BrowserRouter as Router, Route, Link, Redirect	} from 'react-router-dom';

class AdapterViewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		note : this.props.adapter.note,
    		shortDescription : this.props.adapter.shortDescription,
    		adapter : this.props.adapter,
    	    };

  }

  handleNoteChange = (event) => {
	    const field = event.target.name;
	    const adapter = this.state.adapter;
	    adapter[field] = event.target.value;
	    this.setState({ note: event.target.value, adapter: adapter});

	  };

  handleShortDescriptionChange = (event) => {
	    const field = event.target.name;
	    const adapter = this.state.adapter;
	    adapter[field] = event.target.value;
		this.setState({ shortDescription: event.target.value, adapter: adapter});

	  };
	  
	  
  submitForm(adapter) {
	  this.props.updateAdapter(adapter)
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
	      value={this.props.adapter.name}
	      disabled
	      margin="normal"
	      /> 
	    </div>
        <div>
          <TextField
          name="note"
          label="Note"
          style={{ width: 350 }}
          value={this.props.adapter.note}
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
           value={this.props.adapter.shortDescription}
           onChange={this.handleShortDescriptionChange}/>
         </div>          

     	<Grid container style={{ lineHeight: '12px' }} spacing={6}>
 			<Grid item xs={6} sm={4}>
 				<Button variant="raised" style={{textTransform: 'none'}}  onClick={this.props.onSave} >Update Adapter</Button>
 			</Grid>
 			<Grid item xs={6} sm={2}>
 				<Link to={{pathname: '/adapters/adapters'}} style={{ textDecoration: 'none' }}><Button variant="raised" style={{textTransform: 'none'}}>Cancel</Button></Link>
 			</Grid>
 		</Grid>
 		<Route path='/adapters/adapters' component={Adapters}/>
        </form>
      </div>
  );
  }
}


export default AdapterViewForm;
