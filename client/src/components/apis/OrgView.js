import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { linkComponent, unlinkComponent } from '../../actions/apisAction';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';	

class OrgView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    		organisation: Object.assign({}, this.props.location.state.organisation), 
      isSaving: true
    };

    this.updateApiState = this.updateApiState.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.linkComponent = this.linkComponent.bind(this);
    this.unlinkComponent = this.unlinkComponent.bind(this);
//    this.AddAdapterToComponent = this.AddAdapterToComponent.bind(this);
//    this.deleteAdapterFromComponent = this.deleteAdapterFromComponent.bind(this);
//    this.AddKlientToComponent = this.AddKlientToComponent.bind(this);
//    this.deleteklientFromComponent = this.deleteKlientFromComponent.bind(this);
  }

  componentDidMount() {
	  this.setState({ open: true });
  }
  
   componentWillReceiveProps(nextProps) {
    if (this.props.organisation != nextProps.organisation) {
      this.setState({organisation: Object.assign({}, nextProps.organisation)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleSave() {
    this.setState({isSaving: true});
  }

linkComponent(event) {
  this.props.linkComponent(this.state.api);
}  

unlinkComponent(event) {
	  this.props.unlinkComponent(this.state.api);
}
//  AddAdapterToComponent(event) {
//	    this.props.addAdapterToComponent(this.state.api);
//  }
//
//  deleteAdapterFromComponent(event) {
//	    this.props.deleteAdapterFromComponent(this.state.api);
//  }
//  
//  AddKlientToComponent(event) {
//	    this.props.addKlientToComponent(this.state.api);
//}
//
//  deleteKlientFromComponent(event) {
//	    this.props.deleteKlientFromComponent(this.state.api);
//}
  updateApiState(event) {
    const field = event.target.name;
    const organisation = this.state.organisation;
    organisation[field] = event.target.value;
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
  
  handleCloseLink = () => {
	  this.linkComponent(this.state.api)
      this.setState({ open: false });

  };
  handleCloseUnlink = () => {
	  this.unlinkComponent(this.state.api)
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
    		          <DialogTitle id="form-dialog-title">Organisation</DialogTitle>
    		          <DialogContent>
   		              <TextField
    		              margin="dense"
    		    	      required
    		    	      name="name"
    		    	      label="Organisation Navn"
    		    	      value={this.state.organisation.name}  
    		    	      fullWidth
    		              disabled
    		          /> 
    		        
  		       
    		        	<TextField
		                   autoFocus
    		        	   name="displayName"
    		        	   label="Display Navn"
    		        	   value={this.state.organisation.displayName}   
    		        	   fullWidth
    		        	   disabled  
    		        	/>
      		    	  <TextField
	  		    	  	name="orgNumber"
	  		    	  	label="orgNumber"
	  		            onChange={this.updateApiState}
	  		            value={this.state.organisation.orgNumber}
      		    	    disabled
  		    	  />    		   
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


OrgView.propTypes = {

};

function getApiById(apis, id) {
  let api = apis.find(api => api.id == id)
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
    return bindActionCreators({linkComponent : linkComponent, unlinkComponent : unlinkComponent}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(OrgView));
