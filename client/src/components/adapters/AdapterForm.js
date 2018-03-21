import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput';
import CheckBox from '../common/CheckBox';

class AdapterForm extends React.Component {
  constructor(props) {
    super(props);
//    this.makeCheckBoxes = this.makeCheckBoxes.bind(this);
  }
/* TODO
  makeCheckBoxes() {
    return this.props.data.map(adapter => {
      return <CheckBox item={adapter} handleChange={this.props.onAdapterChange} key={adapter.name}/>
    })
  }
*/
  render() {
    //const boxes = this.makeCheckBoxes();
    return (
      <div>
        <form>
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
            name="ClientId"
            label="ClientId"
            value={this.props.adapter.ClientId}
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

AdapterForm.propTypes = {
//  adapter: React.PropTypes.object.isRequired,
//  onSave: React.PropTypes.func.isRequired,
//  onChange: React.PropTypes.func.isRequired,
};

export default AdapterForm;
