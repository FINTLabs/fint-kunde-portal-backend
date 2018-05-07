import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, withRouter	} from 'react-router-dom';
import {deleteAdapter, deleteAdapterFromComponent, addAdapterToComponent} from '../../actions/adaptersAction';
import DashboardIcon from 'material-ui-icons/Home';
import AdapterView from './AdapterView';
import AdapterAddToComponent from './AdapterAddToComponent';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import {Avatar, CardHeader, Grid } from "material-ui";
import {green} from 'material-ui/colors';

const avtarstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],

};

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
class AdaptersList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteAdapter= this.deleteAdapter.bind(this);
	    this.state = {adapters: this.props.adapters, open : true};

	}


 deleteAdapterFromComponent(adapter) {
	if (adapter.components) {
		 const component = adapter.components[0].substr(3, adapter.components[0].indexOf(',')-3);
		 this.props.deleteAdapterFromComponent(adapter, component, this.props.org);
	}
  }

 deleteAdapter(adapter) {
		 this.props.deleteAdapterFromComponent(adapter);
		 this.props.deleteAdapter(adapter, this.props.org);
	}

	render () {
  	    return (
	    <Router>
	     <div>
      		<a href="/" style={{textDecoration:'none'}}><CardHeader	title="Dashboard" avatar={
                <Avatar style={avtarstyle}>
                    <DashboardIcon/>
                </Avatar>}/></a>
  			<h3>Adapters</h3>
  			<ul className="list-group">
  				{this.state.adapters.map((adapter, i) =>
  				<div>
	  	         	<Grid container style={{ lineHeight: '5px' }} spacing={8}>
	  	         		<Grid item xs={16} sm={4}>
	  	         		<Link to={{pathname: '/adapter', state: {adapter : adapter}}} style={{ textDecoration: 'none' }}>
	  	         				<Button style={linkstyle}>{adapter.name}</Button></Link>
	  	         		</Grid>
	  	         		<Grid item xs={16} sm={2}>
	  	         			<Button  onClick={() => this.deleteAdapter(adapter)} style={buttonstyle}>Slett</Button>
	  	         		</Grid>

	  	         		<Grid item xs={16} sm={3}>
	  	         			<Link to={{pathname: '/addAdapterToComponent', state: {adapter : adapter}}} style={{ textDecoration: 'none' }}>
	  	         				<Button style={buttonstyle}>Legg til komponent</Button></Link>
	         			</Grid>
	  	         		<Grid item xs={16} sm={3}>
	         				<Button onClick={() => this.deleteAdapterFromComponent(adapter)} style={buttonstyle}>Fjern fra komponent</Button>
	         			</Grid>
	  	            </Grid>
  	           </div>
  				)}
	      </ul>
	      <Route
	      	path="/adapter"
	      	render={({ props }) => (
	        <AdapterView adapter={this.props.adapter}/>
	        )}
	      />

	      <Route
	      	path="/addAdapterToComponent"
	      	render={({ props }) => (
	        <AdapterAddToComponent adapter={this.props.adapter} />
	        )}
	      />


	    </div>
	  </Router>
	    );
	  }

}

AdaptersList.propTypes = {
	  adapters: PropTypes.array.isRequired
	};

function mapStateToProps(state){
	return {
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({deleteAdapter : deleteAdapter, deleteAdapterFromComponent: deleteAdapterFromComponent}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdaptersList));


