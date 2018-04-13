import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';

class KlientViewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		note : this.props.klient.post.note,
    		shortDescription : this.props.klient.post.shortDescription,
    		klient : this.props.klient.post,
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

          <TextInput
            name="name"
            label="Name"
            value={this.props.klient.post.name}
            onChange={this.props.onChange}/>
 
          <TextInput
           name="note"
           label="Note"
           value={this.state.note}
           onChange={this.handleNoteChange}/>
          
          <TextInput
           name="shortDescription"
           label="ShortDescription"
           value={this.state.shortDescription}
           onChange={this.handleShortDescriptionChange}/>
 
          <input
            type="submit"
            disabled={this.props.saving}
            value={this.props.saving ? 'Saving...' : 'Update'}
            className="btn btn-primary"
            onClick={this.props.onSave}/>
  
          <a href="/klienter/klienter"><button type="button">Cancel</button></a>

        </form>
      </div>
  );
  }
}


export default KlientViewForm;
