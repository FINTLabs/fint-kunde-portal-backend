import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, withRouter	} from 'react-router-dom';
import {fetchApis} from '../../actions/apisAction';
import { linkComponent, unlinkComponent } from '../../actions/apisAction';
import DashboardIcon from 'material-ui-icons/Home';
import ApiView from './ApiView';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import {Avatar, CardHeader, Grid} from "material-ui";
import {green} from 'material-ui/colors';


const buttonstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],
        textDecoration: 'none',
        textTransform: 'none',

};
const linkstyle = {
        margin: 1,
        textDecoration: 'none',
        textTransform: 'none',
        align: 'left'

};
const avtarstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],

};
class ApisList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {apis: this.props.apis};
	    this.updateApiState = this.updateApiState.bind(this);
	    this.toggleSave = this.toggleSave.bind(this);
	    this.linkComponent = this.linkComponent.bind(this);
	    this.unlinkComponent = this.unlinkComponent.bind(this);
//		    this.AddAdapterToComponent = this.AddAdapterToComponent.bind(this);
//		    this.deleteAdapterFromComponent = this.deleteAdapterFromComponent.bind(this);
//		    this.AddKlientToComponent = this.AddKlientToComponent.bind(this);
//		    this.deleteklientFromComponent = this.deleteKlientFromComponent.bind(this);
		  }

	componentDidMount() {
		  this.setState({ open: true });
	  }

	componentWillReceiveProps(nextProps) {
	    if (this.props.api != nextProps.api) {
	      this.setState({api: Object.assign({}, nextProps.api)});

	    }

	    this.setState({saving: false, isAdding: false});
	  }

	toggleSave() {
	    this.setState({isSaving: true});
	  }

	linkComponent(api) {
	  this.props.linkComponent(api);
	}

	unlinkComponent(event) {
		  this.props.unlinkComponent(this.state.api);
	}

  toggleModal = () => {
	    this.setState({
	      isOpen: !this.state.isOpen
	    });
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

	  handleCloseLink = (api) => {
		  this.linkComponent(api)
	      this.setState({ open: false });

	  };
	  handleCloseUnlink = () => {
		  this.unlinkComponent(this.state.api)
	      this.setState({ open: false });

	  };

	render () {
	  return (
	    <Router>
	     <div>
  			<h3>Components</h3>
  			<ul className="list-group">
  				{this.props.apis.map((api, i) =>
  				<div>
	  	         	<Grid container style={{ lineHeight: '5px' }} spacing={24}>
	  	         		<Grid item xs={12} sm={6}>
	  	         			<Link to={{pathname: '/api', state: {api : api}}} style={{ textDecoration: 'none' }}><Button style={linkstyle}>{api.name}</Button></Link>
	  	         		</Grid>
	  	         		<Grid item xs={12} sm={4}>
	  	         			<Button bsStyle="primary" onClick={() => this.handleCloseLink(api)} style={buttonstyle}>Link komponenet</Button>
  	         			</Grid>
	  	         		<Grid item xs={12} sm={2}>

	         			</Grid>
	  	           </Grid>
  	           </div>
  				)}
	      </ul>


	      <Route
	      	path="/api"
	      	render={({ state }) => (
	        <ApiView api={this.state.api} />
	        )}
	      />
	    </div>
	  </Router>
	    );
	  }

}

ApisList.propTypes = {
	  apis: PropTypes.array.isRequired
	};

function mapStateToProps(state){
	return {
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchApis : fetchApis, linkComponent : linkComponent, unlinkComponent : unlinkComponent}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ApisList));


