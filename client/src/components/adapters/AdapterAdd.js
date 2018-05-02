import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createAdapter } from '../../actions/adaptersAction';
import { Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';	
import {green} from 'material-ui/colors';

const style = {
		  margin: 12,
		  textDecoration: 'none',
		};

const buttonstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],
        textDecoration: 'none',
        textTransform: 'none',

};

class AdapterAdd extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: Object.assign({}, this.props.location.state), 
      isSaving: false,
      isAdding: false
    };
    this.createAdapter = this.createAdapter.bind(this);
    this.updateAdapterState = this.updateAdapterState.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.saveAdapter = this.saveAdapter.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.adapter != nextProps.adapter) {
      this.setState({adapter: Object.assign({}, nextProps.adapter)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleAdd() {

    this.setState({isAdding: true});
  }
  
  saveAdapter(event) {

	    this.props.createAdapter(this.state.adapter);
  }


  updateAdapterState(event) {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({adapter: adapter});
  }

  createAdapter(adapter) {
	    this.props.createAdapter(adapter)
  }

  state = {
		    open: false,
		  };
  handleClickOpen = () => {
	    this.setState({ open: true });
	  };

  handleClose = () => {
	this.createAdapter(this.state.adapter)
    this.setState({ open: false });
  };
	  
  render() {
	  
      return (
      <div>
        <div>
        <Button style={buttonstyle} onClick={this.handleClickOpen}>Legg til ny adapter</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ny adapter</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Vennligst fyll ut de obligatoriske feltene for å legge til ny adapter
            </DialogContentText>
            
              <TextField
              autoFocus
              margin="dense"
    	      required
    	      name="name"
    	      label="Adapter Navn"
    	      fullWidth
    	      onChange={this.updateAdapterState}
          /> 
              
          	<TextField
          	   name="shortDescription"
          	   label="Kort beskrivelse"
          	   fullWidth
          	   onChange={this.updateAdapterState}
          	/>        

            <TextField
    	  	name="note"
    	  	label="Note"
    	  	fullWidth
    	  	multiline
            rows="4"
            onChange={this.updateAdapterState}	
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


AdapterAdd.propTypes = {
		adapters : PropTypes.array.isRequired
};

function getAdapterById(adapters, id) {
  let adapter = adapters.find(adapter => adapter.id == id)
  return Object.assign({}, adapter)
}


function mapStateToProps(state) {
  let adapter = {name: '', note: '', shortDescription: ''};
  const adapterName = state.posts.name;
  if (adapterName && state.er.length > 0 ) {
    adapter = getAdapterById(state.adapters, state.posts.name);
 
  } 
    return {adapter: adapter};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({createAdapter : createAdapter}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdapterAdd));
