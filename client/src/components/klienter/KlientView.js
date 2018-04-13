import React from 'react';
import { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { reduxForm } from 'redux-form';
import { updateKlient } from '../../actions/klienterAction';
import KlientViewForm from './KlientViewForm';
import { Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';


class KlientView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      klient: Object.assign({}, this.props.location.state), 
      isSaving: true
    };

    this.updateKlientState = this.updateKlientState.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.updateKlient = this.updateKlient.bind(this);

  }


  componentWillReceiveProps(nextProps) {
    if (this.props.klient != nextProps.klient) {
      this.setState({klient: Object.assign({}, nextProps.klient)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleSave() {
    this.setState({isSaving: true});
  }
  
  updateKlient(event) {
	    event.preventDefault();
	    this.props.updateKlientr(this.state.klient.post);
  }


  updateKlientState(event) {
    const field = event.target.name;
    const klient = this.state.klient;
    klient[field] = event.target.value;
    return this.setState({
    	  value: event.target.value
    });
  }


  render() {

    if (this.state.isSaving) {
      return (
      <div>
        <h3>Update klient</h3>
        <KlientViewForm 
          klient={this.state.klient} 
          onSave={this.updateKlient} 
          onChange={this.updateKlientState} 
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <button onClick={this.toggleSave} className="btn btn-default">Edit Klient</button>
      </div>
    );
  }
}


KlientView.propTypes = {

};

function getKlientById(klienters, id) {
  let klient = klienters.find(klient => klient.id == id)
  return Object.assign({}, klient)
}


function mapStateToProps(state) {
  let klient = {name: '', note: '', clientID: '', shortDescription: ''};
  const klientName = state.posts.name;
  if (klientName && state.klienters.length > 0 ) {
    klient = getKlientById(state.klienters, state.posts.name);
 
  } 
    return {klient: klient};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({updateKlient : updateKlient}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KlientView));
