import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {linkComponent, unlinkComponent} from "../../data/redux/actions/components";


class ApiView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      api: Object.assign({}, this.props.location.state.api),
      isSaving: true
    };

  }

  componentDidMount() {
	  this.setState({ open: true });
  }

   componentWillReceiveProps(nextProps) {
    if (this.props.api !== nextProps.api) {
      this.setState({api: Object.assign({}, nextProps.api)});

    }

    this.setState({saving: false, isAdding: false});
  }


  updateApiState(event) {
    const field = event.target.name;
    const api = this.state.api;
    api[field] = event.target.value;
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
      this.setState({ open: false });
	    //eslint-disable-next-line
      location.assign("/apis/apis");
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
    		          <DialogTitle id="form-dialog-title">Komponent</DialogTitle>
    		          <DialogContent>

   		              <TextField
    		              margin="dense"
    		    	      name="name"
    		    	      label="Komponent Navn"
    		    	      value={this.state.api.name}
    		    	      fullWidth

    		          />

   		              <TextField
    		        	   name="description"
    		        	   label="Beskrivelse"
    		        	   value={this.state.api.description}
    		        	   fullWidth

    		        	/>
      		    	  <TextField
		  		    	  	name="basePath"
		  		    	  	label="basePath"
		  		            onChange={this.updateApiState}
		  		            value={this.state.api.basePath}
	      		    	  	fullWidth
	      		    	    disabled
      		    	    />

      		    	    <TextField
	  	  		    	  	name="organisation"
	  	  		    	  	label="Organisations"
	  	  		            onChange={this.updateApiState}
	  	  		            value={this.state.api.organisations}
	      		    	    fullWidth

        		    	/>
      		    	    <TextField
	  	  		    	  	name="klienter"
	  	  		    	  	label="Klienter"
	      		    	    fullWidth

        		    	/>
	        		    	<dl>
	        		         {this.state.api.clients.map(client => {
	        		             return ( <div key={client.dn}>
	        		                 <dt>{client.substr(3, client.indexOf(',')-3)}</dt>
	        		                </div>
	        		               )
	        		             })
	        		         }
	        		      </dl>
      		    	    <TextField
	  	  		    	  	name="adapters"
	  	  		    	  	label="Adapters"
	      		    	    fullWidth

        		    	/>
	        		    	<dl>
	        		         {this.state.api.adapters.map(adapter => {
	        		             return ( <div key={adapter.dn}>
	        		                 <dt>{adapter.substr(3, adapter.indexOf(',')-3)}</dt>
	        		                </div>
	        		               )
	        		             })
	        		         }
	        		      </dl>
      		    	    </DialogContent>
    		          <DialogActions>
    		            <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
    		            	Avbryt
    		            </Button>
    		            </DialogActions>
    		        </Dialog>
    		      </div>
    		</div>
      )

  }
}


ApiView.propTypes = {

};

function getApiById(apis, id) {
  let api = apis.find(api => api.id === id);
  return Object.assign({}, api)
}


function mapStateToProps(state) {
  let api = {name: '', description: '',  basePath: ''};
  const apiName = state.posts.name;
  if (apiName && state.apis.length > 0 ) {
    api = getApiById(state.apis, state.posts.name);

  }
    return {api: api};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({
      linkComponent : linkComponent,
      unlinkComponent : unlinkComponent
    }, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ApiView));
