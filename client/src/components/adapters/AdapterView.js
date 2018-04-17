import React from 'react';
import { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { reduxForm } from 'redux-form';
import { updateAdapter } from '../../actions/adaptersAction';
import AdapterViewForm from './AdapterViewForm';
import { Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';


class AdapterView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: Object.assign({}, this.props.location.state.adapter), 
      isSaving: true
    };

    this.updateAdapterState = this.updateAdapterState.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.updateAdapter = this.updateAdapter.bind(this);

  }


  componentWillReceiveProps(nextProps) {
    if (this.props.adapter != nextProps.adapter) {
      this.setState({adapter: Object.assign({}, nextProps.adapter)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleSave() {
    this.setState({isSaving: true});
  }
  
  updateAdapter(event) {
	    event.preventDefault();
	    console.log(this.state.adapter);
	    this.props.updateAdapter(this.state.adapter);
  }


  updateAdapterState(event) {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({
    	  value: event.target.value
    });
  }


  render() {

    if (this.state.isSaving) {
      return (
      <div>
        <h3>Update adapter</h3>
        <AdapterViewForm 
          adapter={this.state.adapter} 
          onSave={this.updateAdapter} 
          onChange={this.updateAdapterState} 
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <Button variant="raised" style={{textTransform: 'none'}}  onClick={this.toggleSave} >Edit Adapter</Button>
      </div>
    );
  }
}


AdapterView.propTypes = {

};

function getAdapterById(adapters, id) {
  let adapter = adapters.find(adapter => adapter.id == id)
  return Object.assign({}, adapter)
}


function mapStateToProps(state) {

}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({updateAdapter : updateAdapter}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdapterView));
