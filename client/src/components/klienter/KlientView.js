import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateKlient } from '../../actions/klienterAction';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';	

class KlientView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      klient: Object.assign({}, this.props.location.state.klient), 
      isSaving: true
    };

    this.updateKlientState = this.updateKlientState.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.updateKlient = this.updateKlient.bind(this);

  }

  componentDidMount() {
	  this.setState({ open: true });
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
	    this.props.updateKlient(this.state.klient);
  }


  updateKlientState(event) {
    const field = event.target.name;
    const klient = this.state.klient;
    klient[field] = event.target.value;
    return this.setState({
    value: event.target.value
    });
  }

  state = {
		    open: false,
		  };
	handleClickOpen = () => {
		    this.setState({ open: true });
		  };

  handleClose = () => {
	  this.updateKlient(this.state.klient)
      this.setState({ open: false });

  };
  render() {
      return (
    		     <div>
    		        <div>

    		        <Dialog
    		          open={this.state.open}
    		          onClose={this.handleClose}
    		          aria-labelledby="form-dialog-title"
    		        >
    		          <DialogTitle id="form-dialog-title">Oppdater klienten</DialogTitle>
    		          <DialogContent>
 		            
    		              <TextField
    		              margin="dense"
    		    	      required
    		    	      name="name"
    		    	      label="Klient Navn"
    		    	      value={this.state.klient.name}  
    		    	      fullWidth
    		    	      onChange={this.updateKlientState}
    		              disabled
    		          /> 
    		        
  		       
    		        	<TextField
		                   autoFocus
    		        	   name="shortDescription"
    		        	   label="Kort beskrivelse"
    		        	   fullWidth
    		        	   onChange={this.updateKlientState}
    		               value={this.state.klient.shortDescription}  
    		        	/>
      		    	  <TextField
	  		    	  	name="note"
	  		    	  	label="Note"
	  		    	  	multiline
	  		            rows="4"
	  		            onChange={this.updateKlientState}
	  		            value={this.state.klient.note}  
  		    	  />    		   
    		          </DialogContent>
    		          <DialogActions>
    		            <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
    		            Avbryt
    		            </Button>
    		            <Button onClick={this.handleClose}  color="primary" style={{textTransform: 'none'}}>
    		            Oppdater
    		            </Button>
    		          </DialogActions>
    		        </Dialog>
    		      </div>
    		</div>
      ) 		

  }
}


KlientView.propTypes = {

};

function getKlientById(klienter, id) {
  let klient = klienter.find(klient => klient.id == id)
  return Object.assign({}, klient)
}


function mapStateToProps(state) {
  let klient = {name: '', note: '',  shortDescription: ''};
  const klientName = state.posts.name;
  if (klientName && state.klienter.length > 0 ) {
    klient = getKlientById(state.klienter, state.posts.name);
 
  } 
    return {klient: klient};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({updateKlient : updateKlient}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KlientView));
