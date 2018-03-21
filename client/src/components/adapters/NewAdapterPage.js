import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as courseActions from '../../actions/adapterActions';
import AdapterForm from './AdapterForm';


class NewAdapterPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      adapter: {name: '', note: '', clientId: '', shortDescription: ''},
      saving: false
    };
    this.redirect = this.redirect.bind(this);
    this.saveAdapter = this.saveAdapter.bind(this);
    this.updateAdapterState = this.updateAdapterState.bind(this);
  }


  updateAdapterState(event) {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({adapter: adapter});
  }

  redirect(adapter) {
    browserHistory.push(`/adapters/${adapter.id}`);
  }

  saveAdapter(event) {
    event.preventDefault();
    this.props.actions.createAdapter(this.state.adapter)
    // .then((adapter) => {
    //   this.redirect(adapter);
    // });

  }
  
  render() {
    return (
      <div>
        <h1>new adapter</h1>
        <AdapterForm 
          adapter={this.state.adapter} 
          onSave={this.saveAdapter}
          onChange={this.updateAdapterState}/>
      </div>
    );
  }
}




function mapStateToProps(state, ownProps) {
  }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(NewAdapterPage);





