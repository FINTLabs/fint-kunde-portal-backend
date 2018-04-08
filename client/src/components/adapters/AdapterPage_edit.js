import React from 'react'
import { Link, render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createAdapter, updateAdapter } from '../../actions/adaptersAction';
import AdapterForm from './AdapterForm';

import createHistory from 'history/createBrowserHistory'
import { Redirect } from 'react-router'


class AdapterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
//      adapter: Object.assign({}, this.props.adapter), 
//      saving: false,
      isEditing: false,
      adapter: this.props.adapter,
      adapterComponents: this.props.adapterComponents,
      checkBoxComponents: this.props.checkBoxComponents
    };
//    this.createAdapter = this.createAdapter.bind(this);
    this.updateAdapterState = this.updateAdapterState.bind(this);
    this.updateAdapterComponents = this.updateAdapterComponents.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveAdapter = this.saveAdapter.bind(this);
 /* TODO
    this.redirect = this.redirect.bind(this);
 */
  }
    updateAdapterComponents(event) {
        const adapter = this.state.adapter;
        const componentId = event.target.value;
        const component = this.state.checkBoxComponents.filter(component => component.id == componentId)[0];
        const checked = !component.checked;
        component['checked'] = !component.checked;
        if (checked) {
          adapter.component_ids.push(component.id);
        } else {  
          adapter.component_ids.splice(adapter.component_ids.indexOf(component.id));
        }
        this.setState({adapter: adapter});

      }



  componentWillReceiveProps(nextProps) {
    if (this.props.adapter != nextProps.adapter) {
//      this.setState({adapter: Object.assign({}, nextProps.adapter)});
        this.setState({adapter: nextProps.adapter});
    }
    if (this.props.checkBoxComponents.length < nextProps.checkBoxComponents.length) {
        this.setState({adapterComponents: nextProps.adapterComponents, checkBoxComponents: nextProps.checkBoxComponents});
      }
 //   this.setState({saving: false, isEditing: false});
  }

  toggleEdit() {
//    this.setState({isEditing: true});
	  this.setState({isEditing: !this.state.isEditing})
  }

  updateAdapterState(event) {
      const field = event.target.name;
      const adapter = this.state.adapter;
      adapter[field] = event.target.value;
      return this.setState({adapter: adapter});
    }
  


//  updateAdapterState(event) {
//    const field = event.target.name;
//    const adapter = this.state.adapter;
//    adapter[field] = event.target.value;
//    return this.setState({adapter: adapter});
//  }

  createAdapter(adapter) {
	    this.props.createAdapter(adapter)
  }
  
  saveAdapter(event) {
	    event.preventDefault();
	    this.props.updateAdapter(this.state.adapter);
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
        <h3>{this.state.adapter.name}</h3>
        <p>note: {this.state.adapter.note}</p>
        <p>clientID: {this.state.adapter.clientId}</p>
        <p>shortDescription: {this.state.adapter.shortDescription}</p>
       */

  render() {
    if (this.state.isEditing) {
      return (
//      <div>
//        <h3>Add adapter</h3>
//        <AdapterForm 
//          adapter={this.state.adapter} 
//          onSave={this.createAdapter} 
//          onChange={this.updateAdapterState} 
//          saving={this.state.saving}/> 
//      </div>
    	      <div>
    	        <h3>Edit adapter</h3>
    	        <AdapterForm 
    	          adapter={this.state.adapter} 
    	          components={this.state.checkBoxComponents}
    	          onSave={this.saveAdapter} 
    	          onChange={this.updateAdapterState} 
    	          onComponentChange={this.updateAdapterComponents}/> 
    	      </div>
      )
    }
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
    return (
    	      <div className="col-md-8 col-md-offset-2">
    	        <h1>{this.state.adapter.name}</h1>
    	        <p>name: {this.state.adapter.shortDescription}</p>
    	        <p>note: {this.state.adapter.note}</p>
    	        <p>shortDescription: {this.state.adapter.shortDescription}</p>
    	        <p>clientId: {this.state.adapter.clientId}</p>
    	        <componentsList components={this.state.components} />
    	        <button onClick={this.toggleEdit} 
    	          className="btn btn-default">edit</button>
    	      </div>
//      <div className="col-md-8 col-md-offset-2">
//
//        <button onClick={this.toggleEdit} className="btn btn-default  ">Add Adapter</button>
//
//      </div>
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

function componentsForCheckBoxes(components, adapter=null) {  
	  return components.map(component => {
	    if (adapter && adapter.component_ids.filter(componentId => componentId == component.id).length > 0) {
	      component['checked'] = true;
	    } else {
	      component['checked'] = false;
	    }
	    return component;
	  });
	}

//function mapStateToProps(state) {
//  let adapter = {name: '', note: '', clientID: '', shortDescription: ''};
//  const adapterName = state.posts.name;
//  if (adapterName && state.adapters.length > 0 ) {
//    adapter = getAdapterById(state.adapters, state.posts.name);
// 
//  } 
//    return {adapter: adapter};
//}
AdapterPage.propTypes = {  
//		  adapter: PropTypes.object.isRequired,
//		  AdapterComponents: PropTypes.array.isRequired,
//		  checkBoxComponents: PropTypes.array.isRequired
		};

function mapStateToProps(state, ownProps) {  
	  const stateComponents = Object.assign([], state.components)
	  let checkBoxComponents = [];
	  let adapterComponents = [];
	  let adapter = {name: '', note: '', shortDescription: '', clientId: '', component_ids: []};
//	  const adapterId = ownProps.params.adapter.name;
//	  if (adapterId && state.adapters.length > 0 && state.components.length > 0) {
//	    adapter = getAdapterById(state.adapters, ownProps.params.id);
//	    if (adapter.id && adapter.component_ids.length > 0) {
//	      checkBoxComponents = componentsForCheckBoxes(stateComponents, adapter);
////	      adapterComponents = collectAdapterComponents(stateComponents, adapter);
//	    } else {
////	      checkBoxComponents = componentsForCheckBoxes(stateComponents)
//	    }
//	  } 
	    return {adapter: adapter, checkBoxComponents: checkBoxComponents, adapterComonents: adapterComponents};
	}

//function mapStateToProps(state){
//	return {
//        posts: state.posts
//  }
//}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({createAdapter : createAdapter, updateAdapter : updateAdapter}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(AdapterPage);







