import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createKontakt} from '../../actions/kontakter';
import {withRouter} from "react-router-dom";
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {Add} from "material-ui-icons";
import {withStyles} from "material-ui";

const styles = theme => ({
addButton: {
  margin: 0,
  top: 100,
  left: 'auto',
  bottom: 'auto',
  right: 50,
  position: 'fixed',
}

});

class KontaktAddView extends React.Component {
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

createKontakt(kontakt) {
	console.log(kontakt)
    this.props.createKontakt(kontakt)
  }

updateKontaktState(event) {
  const field = event.target.name;
  const kontakt = this.state.kontakt;
  kontakt[field] = event.target.value;
  return this.setState({
      value: event.target.value
    });
}

createKlient(kontakt) {
  this.props.createKontakt(kontakt)
}

state = {
  open: false,
};
handleClickOpen = () => {
  this.setState({open: true});
};

handleClose = () => {
  this.createKlient(this.state.kontakt)
  this.setState({open: false});
};

render() {

  const {classes} = this.props;
  return (
    <div>
      <div>
        <Button variant="fab" color="secondary"  className={classes.addButton} onClick={this.handleClickOpen}><Add/></Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ny kontakt</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vennligst fyll ut de obligatoriske feltene for å legge til ny kontakt
            </DialogContentText>

		        <TextField
		  	    	name="nin"
		  	    	label="Fødselsnnummer"
		            autoFocus
		            margin="dense"
		  	        required
	  	            fullWidth
	            	onChange={this.updateKontaktState}
		            value={this.state.kontakt.nin}  
		        	type='password'
		        	disabled
	  	         /> 
	            <TextField
		            name="firstName"
		            label="First Name"
		            margin="normal"
		  	        required
	  	            fullWidth
	            	onChange={this.updateKontaktState}
		            value={this.state.kontakt.firstName}
	            /> 
	       
	           <TextField
	             name="lastName"
	             label="Last Name"
	  	         required
	             fullWidth
	        	 onChange={this.updateKontaktState}
		         value={this.state.kontakt.lastName}   
	           />

	           <TextField
	           		name="mail"
	           		label="Mail"
	           		required
	           		fullWidth
	           		onChange={this.updateKontaktState}
		            value={this.state.kontakt.mail}
	           />

	           <TextField
	      		name="mobile"
	      		label="Mobile"
	      		required
	      		fullWidth
	      		onChange={this.updateKontaktState}
		        value={this.state.kontakt.mobile}    
	          />     		   

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
              Avbryt
            </Button>
            <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
              Legg til
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
}


KontaktAddView.propTypes = {
kontakter: PropTypes.array.isRequired
};

function getKontaktById(kontakter, id) {
let kontakt = kontakter.find(kontakt => kontakt.id == id)
return Object.assign({}, kontakt)
}


function mapStateToProps(state) {
let kontakt = {name: '', note: '', shortDescription: ''};
const klientName = state.posts.name;
if (klientName && state.kontakter.length > 0) {
  kontakt = getKontaktById(state.kontakter, state.posts.name);

}
return {kontakt: kontakt};
}

function matchDispatchToProps(dispatch) {
return bindActionCreators({createKontakt: createKontakt}, dispatch);
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, matchDispatchToProps)(KontaktAddView)));








