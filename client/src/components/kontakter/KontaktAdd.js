import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createKontakt } from '../../actions/kontakterAction';
import { Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';	
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

  state = {
		    open: false,
		  };
  handleClickOpen = () => {
	    this.setState({ open: true });
	  };

	  handleClose = () => {
    	this.createKontakt(this.state.kontakt)
	    this.setState({ open: false });
	  };
	  
  render() {
	  
      return (
      <div>
        <div>
        <Button onClick={this.handleClickOpen}>Legg til ny kontakt</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle name="form-dialog-title">Ny kontakt</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Vennligst fyll ut de obligatoriske feltene for å legge til ny kontakt
            </DialogContentText>
            <TextField
	  	    	name="nin"
	  	    	label="nin"
	            autoFocus
	            margin="dense"
	  	        required
  	            fullWidth
            	onChange={this.updateKontaktState}
  	         /> 
            <TextField
	            name="firstName"
	            label="First Name"
	            margin="normal"
	  	        required
  	            fullWidth
            	onChange={this.updateKontaktState}
            /> 
       
           <TextField
             name="lastName"
             label="Last Name"
  	         required
             fullWidth
        	 onChange={this.updateKontaktState}
           />

           <TextField
           		name="mail"
           		label="Mail"
           		required
           		fullWidth
           		onChange={this.updateKontaktState}
           />

           <TextField
      		name="mobile"
      		label="Mobile"
      		required
      		fullWidth
      		onChange={this.updateKontaktState}
          /> 
  
          </DialogContent>
	          <DialogActions>
	            <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
	            Avbryt
	            </Button>
	            <Button onClick={this.handleClose}  color="primary" style={{textTransform: 'none'}}>
	            Legg til
	            </Button>
	          </DialogActions>
        </Dialog>
      </div>
     </div>
      )
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
  let kontakt = {name: '', note: '', shortDescription: ''};
  const kontaktName = state.posts.name;
  if (kontaktName && state.kontakter.length > 0 ) {
    kontakt = getKontaktById(state.kontakter, state.posts.name);
 
  } 
    return {kontakt: kontakt};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({createKontakt : createKontakt}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontaktAdd));







