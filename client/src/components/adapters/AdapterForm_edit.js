import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import CheckBox from '../common/CheckBox';
import {bindActionCreators} from 'redux';

class AdapterForm extends React.Component {
  constructor(props) {
    super(props);
//    this.makeCheckBoxes = this.makeCheckBoxes.bind(this);
  }
  
  submitForm(adapter) {
	  this.props.createAdapter(adapter)
	}
// TODO
//  makeCheckBoxes() {
//    return this.props.adapter.components.map(adapter.components => {
//      return <CheckBox item={adapter.components} handleChange={this.props.onComponentChange} key={adapter.components.id}/>
//    })
//  }

	/* The object looks like
{
      "dn": "cn=testAdapter,ou=adapters,ou=testing,ou=organisations,o=fint-test",
      "name": "testAdapter",
      "shortDescription": "This is a Test Adapter",
      "note": "Test Adapter",
      "clientId": "A_testing_testAdapter_ClientId",
      "components": []
  }
	 */
  render() {
//	  const boxes = this.makeCheckBoxes();
//	const {handleSubmit, submitForm} = this.props;
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
          		
          <TextInput
            name="clientId"
            label="clientId"
            value={this.props.adapter.clientId}
            onChange={this.props.onChange}/>


          		
          <input
            type="submit"
            disabled={this.props.saving}
            className="btn btn-primary"
            onClick={this.props.onSave}/>
        </form>
      </div>
  );
  }
}

AdapterForm.propTypes = {
  //adapter: PropTypes.object.isRequired,
  components: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  //onComponentChange: React.PropTypes.func.isRequired
};

export default AdapterForm;
