import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';

class KlienterViewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		note : this.props.klienter.post.note,
    		shortDescription : this.props.klienter.post.shortDescription,
    		klienter : this.props.klienter.post,
    	    };

  }

  handleNoteChange = (event) => {
	    const field = event.target.name;
	    const klienter = this.state.klienter;
	    klienter[field] = event.target.value;
	    this.setState({ note: event.target.value, klienter: klienter});

	  };

  handleShortDescriptionChange = (event) => {
	    const field = event.target.name;
	    const klienter = this.state.klienter;
	    klienter[field] = event.target.value;
		this.setState({ shortDescription: event.target.value, klienter: klienter});

	  };
	  
	  
  submitForm(klienter) {
	  this.props.updateKlienter(klienter)
	}

  render() {
	  
	const {handleSubmit, submitForm} = this.props;
    return (
    	   
      <div>
      <form onSubmit={()=> this.submitForm()}>

          <TextInput
            name="name"
            label="Name"
            value={this.props.klienter.post.name}
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


export default KlienterViewForm;
