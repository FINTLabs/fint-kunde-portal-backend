import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { reduxForm } from 'redux-form';
import { updateKontakt } from '../../actions/kontakterAction';
import KontaktViewForm from './KontaktViewForm';
import { Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';


class KontaktView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      kontakt: Object.assign({}, this.props.location.state.kontakt), 
      isSaving: true
    };

    this.updateKontaktState = this.updateKontaktState.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.updateKontakt = this.updateKontakt.bind(this);

  }


  componentWillReceiveProps(nextProps) {
    if (this.props.kontakt != nextProps.kontakt) {
      this.setState({kontakt: Object.assign({}, nextProps.kontakt)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleSave() {
    this.setState({isSaving: true});
  }
  
  updateKontakt(event) {
	    event.preventDefault();
	    console.log(this.state.kontakt);
	    this.props.updateKontakt(this.state.kontakt);
  }


  updateKontaktState(event) {
    const field = event.target.name;
    const kontakt = this.state.kontakt;
    kontakt[field] = event.target.value;
    return this.setState({
    	  value: event.target.value
    });
  }


  render() {

    if (this.state.isSaving) {
      return (
      <div>
        <h3>Update kontakt</h3>
        <KontaktViewForm 
          kontakt={this.state.kontakt} 
          onSave={this.updateKontakt} 
          onChange={this.updateKontaktState} 
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <Button variant="raised" style={{textTransform: 'none'}}  onClick={this.toggleSave} >Edit Kontakt</Button>
      </div>
    );
  }
}


KontaktView.propTypes = {
	 kontakter: PropTypes.array.isRequired,
	 children: PropTypes.object
};

function getKontaktById(kontakter, id) {
  let kontakt = kontakter.find(kontakt => kontakt.id == id)
  return Object.assign({}, kontakt)
}


function mapStateToProps(state) {
	return {
	    kontakter: state.kontakter
	  };
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({updateKontakt : updateKontakt}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontaktView));
