import React from 'react';
//import { PropTypes } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createKlient } from '../../actions/klienterAction';
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

class KlientAdd extends React.Component {
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

  state = {
		    open: false,
		  };
  handleClickOpen = () => {
	    this.setState({ open: true });
	  };

	  handleClose = () => {
    	this.createKlient(this.state.klient)
	    this.setState({ open: false });
	  };
	  
  render() {
	  
      return (
      <div>
        <div>
        <Button onClick={this.handleClickOpen}>Legg til ny klient</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ny klient</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Vennligst fyll ut de obligatoriske feltene for å legge til ny klient
            </DialogContentText>
            
              <TextField
              autoFocus
              margin="dense"
    	      required
    	      name="name"
    	      label="Klient Navn"
    	      fullWidth
    	      onChange={this.updateKlientState}
          /> 
              
          	<TextField
          	   name="shortDescription"
          	   label="Kort beskrivelse"
          	   fullWidth
          	   onChange={this.updateKlientState}
          	/>        

            <TextField
    	  	name="note"
    	  	label="Note"
    	  	fullWidth	
    	  	multiline
            rows="4"
            onChange={this.updateKlientState}	
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


KlientAdd.propTypes = {
		klienter : PropTypes.array.isRequired
};

function getKlientById(klienter, id) {
  let klient = klienter.find(klient => klient.id == id)
  return Object.assign({}, klient)
}


function mapStateToProps(state) {
  let klient = {name: '', note: '', shortDescription: ''};
  const klientName = state.posts.name;
  if (klientName && state.klienter.length > 0 ) {
    klient = getKlientById(state.klienter, state.posts.name);
 
  } 
    return {klient: klient};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({createKlient : createKlient}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KlientAdd));







