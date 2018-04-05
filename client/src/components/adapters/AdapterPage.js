import React from 'react'
import { Link, render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createAdapter } from '../../actions/adaptersAction';
import AdapterForm from './AdapterForm';
import createHistory from 'history/createBrowserHistory'
import { Redirect } from 'react-router'


class AdapterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: Object.assign({}, this.props.adapter), 
      saving: false,
      isEditing: false
    };
    this.createAdapter = this.createAdapter.bind(this);
    this.updateAdapterState = this.updateAdapterState.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteAdapter = this.deleteAdapter.bind(this);
 /* TODO
    this.redirect = this.redirect.bind(this);
 */
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.adapter.id != nextProps.adapter.id) {
      this.setState({adapter: Object.assign({}, nextProps.adapter)});
    }

    this.setState({saving: false, isEditing: false});
  }

  toggleEdit() {
    this.setState({isEditing: true});
  }


  updateAdapterState(event) {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({adapter: adapter});
  }

  createAdapter(adapter) {
	    this.props.createAdapter(adapter)
  }

  deleteAdapter(event) {
    this.props.actions.deleteAdapter(this.state.adapter)
  }
/* TODO
  redirect() {
    browserHistory.push('/adapters');
  }
*/
/* TODO
 *       /*
        <h1>{this.state.adapter.name}</h1>
        <p>note: {this.state.adapter.note}</p>
        <p>clientID: {this.state.adapter.clientId}</p>
        <p>shortDescription: {this.state.adapter.shortDescription}</p>
       */

  render() {
    if (this.state.isEditing) {
      return (
      <div>
        <h1>Add adapter</h1>
        <AdapterForm 
          adapter={this.state.adapter} 
          onSave={this.addAdapter} 
          onChange={this.updateAdapterState} 
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">

        <button onClick={this.createAdapter} className="btn btn-default  ">Add Adapter</button>

      </div>
    );
  }
}


AdapterPage.propTypes = {
//  adapter: PropTypes.object.isRequired,
//  actions: PropTypes.object.isRequired
};

function getAdapterById(adapters, id) {
  let adapter = adapters.find(adapter => adapter.id == id)
  return Object.assign({}, adapter)
}


function mapStateToProps(state) {
  let adapter = {name: '', note: '', clientID: '', shortDescription: ''};
  const adapterName = state.posts.name;
  if (adapterName && state.adapters.length > 0 ) {
    adapter = getAdapterById(state.adapters, state.posts.name);
 
  } 
    return {adapter: adapter};
}

function mapStateToProps(state){
	return {
        posts: state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({createAdapter : createAdapter}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(AdapterPage);







