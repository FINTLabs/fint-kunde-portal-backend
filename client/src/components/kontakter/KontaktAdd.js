import React from 'react';
//import { PropTypes } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createKontakt } from '../../actions/kontakterAction';
import KontaktAddForm from './KontaktAddForm';
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

class KontaktAdd extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      kontakt: Object.assign({}, this.props.location.state), 
      isSaving: false,
      isAdding: false
    };
    this.createKontakt = this.createKontakt.bind(this);
    this.updateKontaktState = this.updateKontaktState.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.saveKontakt = this.saveKontakt.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.kontakt != nextProps.kontakt) {
      this.setState({kontakt: Object.assign({}, nextProps.kontakt)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleAdd() {
    this.setState({isAdding: true});
  }
  
  saveKontakt(event) {
	    event.preventDefault();
	    this.props.createKontakt(this.state.kontakt);
  }


  updateKontaktState(event) {
    const field = event.target.name;
    const kontakt = this.state.kontakt;
    kontakt[field] = event.target.value;
    return this.setState({kontakt: kontakt});
  }

  createKontakt(kontakt) {
	    this.props.createKontakt(kontakt)
  }


  render() {
	  
    if (this.state.isAdding) {
      return (
      <div>
        <h3>Add kontakt</h3>
        <KontaktAddForm 
          kontakt={this.state.kontakt} 
          onSave={this.saveKontakt} 
          onChange={this.updateKontaktState} 
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
       <Button variant="raised" style={{textTransform: 'none'}} onClick={this.toggleAdd} >Add Kontakt</Button>
      </div>
    );
  }
}


KontaktAdd.propTypes = {
		kontakter : PropTypes.array.isRequired
};

function getKontaktById(kontakter, id) {
  let kontakt = kontakter.find(kontakt => kontakt.id == id)
  return Object.assign({}, kontakt)
}


function mapStateToProps(state) {
  let kontakt = {nin: '', firstName: '', lastName: ''};
  const kontaktNin = state.posts.nin;
  if (kontaktNin && state.kontakter.length > 0 ) {
    kontakt = getKontaktById(state.kontakter, state.posts.nin);
 
  } 
    return {kontakt: kontakt};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({createKontakt : createKontakt}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontaktAdd));







