import React from 'react';
import { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { reduxForm } from 'redux-form';
import { updateKlienter } from '../../actions/klienterAction';
import KlienterViewForm from './KlienterViewForm';
import { Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';


class KlienterView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      klienter: Object.assign({}, this.props.location.state), 
      isSaving: true
    };

    this.updateKlienterState = this.updateKlienterState.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.updateKlienter = this.updateKlienter.bind(this);

  }


  componentWillReceiveProps(nextProps) {
    if (this.props.klienter != nextProps.klienter) {
      this.setState({klienter: Object.assign({}, nextProps.klienter)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleSave() {
    this.setState({isSaving: true});
  }
  
  updateKlienter(event) {
	    event.preventDefault();
	    this.props.updateKlienter(this.state.klienter.post);
  }


  updateKlienterState(event) {
    const field = event.target.name;
    const klienter = this.state.klienter;
    klienter[field] = event.target.value;
    return this.setState({
    	  value: event.target.value
    });
  }


  render() {

    if (this.state.isSaving) {
      return (
      <div>
        <h3>Update klienter</h3>
        <KlienterViewForm 
          klienter={this.state.klienter} 
          onSave={this.updateKlienter} 
          onChange={this.updateKlienterState} 
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <button onClick={this.toggleSave} className="btn btn-default">Edit Klienter</button>
      </div>
    );
  }
}


KlienterView.propTypes = {

};

function getKlienterById(klienters, id) {
  let klienter = klienters.find(klienter => klienter.id == id)
  return Object.assign({}, klienter)
}


function mapStateToProps(state) {
  let klienter = {name: '', note: '', clientID: '', shortDescription: ''};
  const klienterName = state.posts.name;
  if (klienterName && state.klienters.length > 0 ) {
    klienter = getKlienterById(state.klienters, state.posts.name);
 
  } 
    return {klienter: klienter};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({updateKlienter : updateKlienter}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KlienterView));
