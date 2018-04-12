import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';

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
      
          <TextInput
            name="name"
            label="name"
            value={this.props.adapter.name}
            onChange={this.props.onChange}/>

   
          <TextInput
            name="note"
            label="note"
            value={this.props.adapter.note}
            onChange={this.props.onChange}/>


          <TextInput
          name="shortDescription"
          label="ShortDescription"
          value={this.props.adapter.shortDescription}
          onChange={this.props.onChange}/>
	      
 

          <input
            type="submit"
            disabled={this.props.saving}
            value={this.props.saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={this.props.onSave}/>
        </form>
      </div>
  );
  }
}



export default AdapterForm;
