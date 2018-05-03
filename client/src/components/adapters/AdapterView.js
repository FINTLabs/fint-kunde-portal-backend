import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateAdapter } from '../../actions/adaptersAction';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

class AdapterView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: Object.assign({}, this.props.location.state.adapter), 
      isSaving: true
    };

    this.updateAdapterState = this.updateAdapterState.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.updateAdapter = this.updateAdapter.bind(this);

  }

  componentDidMount() {
	  this.setState({ open: true });
  }
  
   componentWillReceiveProps(nextProps) {
    if (this.props.adapter != nextProps.adapter) {
      this.setState({adapter: Object.assign({}, nextProps.adapter)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleSave() {
    this.setState({isSaving: true});
  }
  
  updateAdapter(adapter, org) {
	    this.props.updateAdapter(this.state.adapter, org);
  }


  updateAdapterState(event) {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
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

  handleClose(org)  {
	  this.updateAdapter(this.state.adapter, org)
  };
  handleCancel = () => {
	      this.setState({ open: false });
	  };

	static contextTypes = {
        organisation: PropTypes.string
    };
	render () {
		const org = this.context.organisation;
      return (
    		     <div>
    		        <div>

    		        <Dialog
    		          open={this.state.open}
    		          onClose={this.handleClose}
    		          aria-labelledby="form-dialog-title"
    		        >
    		          <DialogTitle id="form-dialog-title">Oppdater adapteren</DialogTitle>
    		          <DialogContent>
    		              <TextField
	    		              margin="dense"
	    		    	      required
	    		    	      name="name"
	    		    	      label="Adapter Navn"
	    		    	      value={this.state.adapter.name}  
	    		    	      fullWidth
	    		    	      onChange={this.updateAdapterState}
	    		              disabled
    		              /> 
    		        
  		       
    		        	<TextField
		                   autoFocus
    		        	   name="shortDescription"
    		        	   label="Kort beskrivelse"
    		        	   fullWidth
    		        	   onChange={this.updateAdapterState}
    		               value={this.state.adapter.shortDescription}  
    		        	/> 
    		        	<TextField
		                   autoFocus
	 		        	   name="clientId"
	 		        	   label="Klient Id"
	 		        	   fullWidth
	 		        	   onChange={this.updateAdapterState}
	 		               value={this.state.adapter.clientId}  
    		        	/>
    		            <TextField
		  		    	  	name="note"
		  		    	  	label="Note"
		  		    	  	multiline
		  		            rows="4"
		  		            onChange={this.updateAdapterState}
		  		            value={this.state.adapter.note}  
    		           /> 	   
      		    	    <TextField
	  	  		    	  	name="Komponenter"
	  	  		    	  	label="Komponenter"
	      		    	    fullWidth

        		    	/> 
	        		    	<dl>
	        		         {this.state.adapter.components.map(component => {
	        		             return ( <div key={component.dn}>
	        		                 <dt>{component.substr(3, component.indexOf(',')-3)}</dt>
	        		                </div>
	        		               )
	        		             })
	        		         }
	        		      </dl>
    		          </DialogContent>
    		          <DialogActions>
    		            <Button onClick={this.handleCancel} color="primary" style={{textTransform: 'none'}}>
    		            Avbryt
    		            </Button>
    		            <Button onClick={this.handleClose(org)}  color="primary" style={{textTransform: 'none'}}>
    		            Oppdater
    		            </Button>
    		          </DialogActions>
    		        </Dialog>
    		      </div>
    		</div>
      ) 		

  }
}


AdapterView.propTypes = {

};

function getAdapterById(adapters, id) {
  let adapter = adapters.find(adapter => adapter.id == id)
  return Object.assign({}, adapter)
}


function mapStateToProps(state) {
  let adapter = {name: '', note: '',  shortDescription: ''};
  const adapterName = state.posts.name;
  if (adapterName && state.adapters.length > 0 ) {
    adapter = getAdapterById(state.adapters, state.posts.name);
 
  } 
    return {adapter: adapter};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({updateAdapter : updateAdapter}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdapterView));
