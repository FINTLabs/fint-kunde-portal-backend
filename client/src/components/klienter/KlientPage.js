import React from 'react';
import { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createKlient } from '../../actions/klienterAction';
import KlientForm from './KlientForm';
import { Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
import { Redirect } from 'react-router'


class KlienterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      klient: Object.assign({}, this.props.location.state), 
      isSaving: false,
      isAdding: false
    };
    this.createKlient = this.createKlient.bind(this);
    this.updateKlientState = this.updateKlientState.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.saveKlient = this.saveKlient.bind(this);

  }


  componentWillReceiveProps(nextProps) {
    if (this.props.klient != nextProps.klient) {
      this.setState({klient: Object.assign({}, nextProps.klient)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleAdd() {
    this.setState({isAdding: true});
  }
  
  saveKlient(event) {
	    event.preventDefault();
	    this.props.createKlient(this.state.klient);
  }


  updateKlientState(event) {
    const field = event.target.name;
    const klient = this.state.klient;
    klient[field] = event.target.value;
    return this.setState({klient: klient});
  }

  createKlient(klient) {
	    this.props.createKlient(klient)
  }


  render() {
	  
    if (this.state.isAdding) {
      return (
      <div>
        <h3>Add klient</h3>
        <KlientForm 
          klient={this.state.klient} 
          onSave={this.saveKlient} 
          onChange={this.updateKlientState} 
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <button onClick={this.toggleAdd} className="btn btn-default  ">Add Klient</button>
      </div>
    );
  }
}


KlienterPage.propTypes = {

};

function getKlientById(klienter, id) {
  let klient = klient.find(klient => klient.id == id)
  return Object.assign({}, klient)
}


function mapStateToProps(state) {
  let klient = {name: '', note: '', shortDescription: ''};
  const klientName = state.posts.name;
  if (klientName && state.klient.length > 0 ) {
    klient = getKlientById(state.klient, state.posts.name);
 
  } 
    return {klient: klient};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({createKlient : createKlient}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KlienterPage));







