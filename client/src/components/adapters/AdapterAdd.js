import React from 'react';
//import { PropTypes } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createAdapter } from '../../actions/adaptersAction';
import AdapterAddForm from './AdapterAddForm';
import { Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';

const styles = theme => ({
	  button: {
	    margin: theme.spacing.unit,
	    textTransform: 'none'
	  },
	});

class AdapterAdd extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: Object.assign({}, this.props.location.state), 
      isSaving: false,
      isAdding: false
    };
    this.createAdapter = this.createAdapter.bind(this);
    this.updateAdapterState = this.updateAdapterState.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.saveAdapter = this.saveAdapter.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.adapter != nextProps.adapter) {
      this.setState({adapter: Object.assign({}, nextProps.adapter)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleAdd() {
    this.setState({isAdding: true});
  }
  
  saveAdapter(event) {
	    event.preventDefault();
		  console.log("ttttt");
		  console.log(this.state.adapter);
	    this.props.createAdapter(this.state.adapter);
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


  render() {
	  
    if (this.state.isAdding) {
      return (
      <div>
        <h3>Add adapter</h3>
        <AdapterAddForm 
          adapter={this.state.adapter} 
          onSave={this.saveAdapter} 
          onChange={this.updateAdapterState} 
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
       <Button variant="raised" style={{textTransform: 'none'}} onClick={this.toggleAdd} >Add Adapter</Button>
      </div>
    );
  }
}


AdapterAdd.propTypes = {
		adapters : PropTypes.array.isRequired
};

function getAdapterById(adapters, id) {
  let adapter = adapters.find(adapter => adapter.id == id)
  return Object.assign({}, adapter)
}


function mapStateToProps(state) {
  let adapter = {name: '', note: '', shortDescription: ''};
  const adapterName = state.posts.name;
  if (adapterName && state.adapters.length > 0 ) {
    adapter = getAdapterById(state.adapters, state.posts.name);
 
  } 
    return {adapter: adapter};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({createAdapter : createAdapter}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdapterAdd));







