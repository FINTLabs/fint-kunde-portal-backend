import React from 'react';
import SearchComponent from '../common/SearchComponent'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateAdapter } from '../../actions/adaptersAction';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import {ListItemIcon, ListItemText } from 'material-ui/List';
import SelectField from 'material-ui/Select';
import {Grid} from "material-ui";
import {green} from 'material-ui/colors';

const buttonstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],
        textDecoration: 'none',
        textTransform: 'none',

};

class AdapterAddToComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: Object.assign({}, this.props.location.state.adapter),
      posts: this.props.posts,
      open: true
    };

    this.updateAdapterState = this.updateAdapterState.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.updateAdapter = this.updateAdapter.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
	  this.setState({ value: 1 });
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
    value: 1,
 };
 handleClickOpen = () => {
    this.setState({ open: true });
 };

 handleClose = () => {
	  this.setState({ open: false });

};

 handleCloseUpdate = () => {
	  this.updateAdapter(this.state.adapter, this.context.organisation)
	  this.setState({ open: false });
};

static contextTypes = {
    organisation: PropTypes.string,
    components: PropTypes.array
};

handleChange(event, index, value)  {
   this.setState({Dialog});

 }
SelectedItems(items) {

}
	render () {
		console.log("here")
		console.log(this.props)
		console.log(this)
	  let components = this.context.components
	    let items = []
		{this.context.components.map((component, i) => 
			items[i] = {id: i, value: component.name}
		)}
      return (
    	<div>

        <Dialog
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Legg till adapter til Komponent</DialogTitle>
          <DialogContent>
              <TextField
	              margin="dense"
	    	      name="name"
	    	      label="Adapter Navn"
	    	      value={this.state.adapter.name}  
	    	      fullWidth
	              disabled
              /> 
		
		  		<SearchComponent items={items}
                placeholder='..Velg komponent '
                maxSelected={3}
                multiple={true}
                onItemsChanged={this.SelectedItems.bind(this)} />
	        </DialogContent>
	        <DialogActions>
	            <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
	            Avbryt
	            </Button>

	          </DialogActions>
	        </Dialog>
	 </div>
      ) 		

  }
}


AdapterAddToComponent.propTypes = {

};

function getAdapterById(adapters, id) {
  let adapter = adapters.find(adapter => adapter.id == id)
  return Object.assign({}, adapter)
}


function mapStateToProps() {
  let adapter = {name: '', note: '',  shortDescription: ''};
    return {adapter: adapter};
}

function  matchDispatchToProps(dispatch){
    return bindActionCreators({updateAdapter : updateAdapter}, dispatch);
}
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdapterAddToComponent));
