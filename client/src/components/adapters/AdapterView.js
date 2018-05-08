import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateAdapter, deleteAdapterFromComponent} from '../../actions/AdaptersAction';
import { BrowserRouter as Router, Route, Link, withRouter	} from 'react-router-dom';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import AdapterAddToComponent from './AdapterAddToComponent';

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
    this.deleteAdapterFromComponent = this.deleteAdapterFromComponent.bind(this);

  }

  componentDidMount() {

    this.setState({open: true});
  }

  componentWillMount() {

	this.setState({open: true});
  }

  componentWillReceiveProps(nextProps) {

	  if (this.props.adapter != nextProps.adapter) {
      this.setState({adapter: Object.assign({}, nextProps.adapter)});

    }

    this.setState({saving: false, isAdding: false});
    this.setState({open: true});
  }

  toggleSave() {
    this.setState({isSaving: true});
  }

  updateAdapter(adapter, org) {
    this.props.updateAdapter(adapter, org);
  }

  deleteAdapterFromComponent(adapter, org) {
		 if (adapter.components[0] != null) {
			 const component = adapter.components[0].substr(3, adapter.components[0].indexOf(',')-3);
			 this.props.deleteAdapterFromComponent(adapter, component, org);
		}
  }

  updateAdapterState(event) {

    const field = event.target.name;
    const adapter = this.props.location.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });

  }

  state = {
    open: false,
  };
  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleCloseDelete = () => {
	this.deleteAdapterFromComponent(this.state.adapter, this.context.organisation)
    this.setState({open: false});
  };

  handleCloseUpdate = () => {
	    this.updateAdapter(this.state.adapter, this.context.organisation)
	    this.setState({open: false});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  static contextTypes = {
    organisation: PropTypes.string,
    components: PropTypes.array
  };

  render() {

    return (
    <Router>
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
                value={this.props.location.state.adapter.name}
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
                value={this.props.location.state.adapter.shortDescription}
              />
              <TextField
                autoFocus
                name="clientId"
                label="Klient Id"
                fullWidth
                onChange={this.updateAdapterState}
                value={this.props.location.state.adapter.clientId}
                disabled
              />
              <TextField
                name="note"
                label="Note"
                multiline
                rows="4"
                onChange={this.updateAdapterState}
                value={this.props.location.state.adapter.note}
              />
              <TextField
                name="Komponenter"
                label="Komponenter"
                fullWidth

              />
              <dl>
                {this.props.location.state.adapter.components.map(component => {
                  return (<div key={component.dn}>
                      <dt>{component.substr(3, component.indexOf(',') - 3)}</dt>
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
              <Button onClick={this.handleCloseUpdate} color="primary" style={{textTransform: 'none'}}>
                Oppdater
              </Button>
              <Link to={{pathname: '/addAdapterToComponent', state: {adapter : this.props.location.state.adapter}}} style={{ textDecoration: 'none' }}>
   				<Button color="primary" style={{textTransform: 'none'}}>Legg til komponent</Button></Link>
              <Button onClick={this.handleCloseDelete} color="primary" style={{textTransform: 'none'}}>
                Fjern fra komponent
              </Button>
            </DialogActions>
          </Dialog>
        </div>
	      <Route
	      	path="/addAdapterToComponent"
	      	render={({ props }) => (
	        <AdapterAddToComponent adapter={this.props.location.state.adapter} />
	        )}
	      />
      </div>
	 </Router>
    )

  }
}


AdapterView.propTypes = {};

function getAdapterById(adapters, id) {
  let adapter = adapters.find(adapter => adapter.id == id)
  return Object.assign({}, adapter)
}


function mapStateToProps(state) {
  let adapter = {name: '', note: '', shortDescription: ''};
  const adapterName = state.posts.name;
  if (adapterName && state.adapters.length > 0) {
    adapter = getAdapterById(state.adapters, state.posts.name);

  }
  return {adapter: adapter};
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({updateAdapter: updateAdapter, deleteAdapterFromComponent: deleteAdapterFromComponent}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdapterView));
