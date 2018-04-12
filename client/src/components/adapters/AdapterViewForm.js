import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';

class AdapterViewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    		note : this.props.adapter.post.note,
    		shortDescription : this.props.adapter.post.shortDescription,
    		adapter : this.props.adapter.post,
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

          <TextInput
            name="name"
            label="name"
            value={this.props.adapter.post.name}
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
        </form>
      </div>
  );
  }
}


export default AdapterViewForm;
