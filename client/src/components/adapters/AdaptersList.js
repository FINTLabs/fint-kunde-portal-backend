import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import {deleteAdapter} from '../../actions/adaptersAction';
import DashboardIcon from 'material-ui-icons/Home';
import AdapterView from './AdapterView';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography, withStyles} from "material-ui";
import {green} from 'material-ui/colors';

const styles = {
		  smallIcon: {
		    width: 25,
		    height: 19
		  },
		  small: {
		    width: 25,
		    height: 19
		  },
		  margin: 12,
};
const avtarstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],

};
class AdaptersList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteAdapter= this.deleteAdapter.bind(this);
	    this.state = {adapters: this.props.adapters};
	}

	deleteAdapter(adapter) {
		 this.props.deleteAdapter(adapter)
	}
	render () {
	  return (
	    <Router>
	     <div>
      		<a href="/" style={{textDecoration:'none'}}><CardHeader	title="Dashboard" avatar={
                <Avatar style={avtarstyle}>
                    <DashboardIcon/>
                </Avatar>}/></a>
  			<h1>Adapters</h1>
  			<ul className="list-group">
  				{this.props.adapters.map((adapter, i) => 
  			<div>
  	         	<Grid container style={{ lineHeight: '5px' }} spacing={24}>
  	         		<Grid item xs={12} sm={7}>
  	         			<li className="list-group-item" key={i}><Link to={{pathname: '/adapter', state: {adapter : adapter}}} style={{ textDecoration: 'none' }}>{adapter.name}</Link></li>
  	         		</Grid>
  	         		<Grid item xs={12} sm={1}>
  	         			<Button style={{ padding: '1px 20px' }} onClick={() => {this.deleteAdapter(adapter)}} className="btn btn-default">Slett</Button>
  	         		</Grid>
  	         	</Grid>
			</div>

  				)}
	      </ul>

	      <Route
	      	path="/adapter"
	      	render={({ state }) => (
	        <AdapterView adapter={this.state.adapter} />
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
    return bindActionCreators({deleteAdapter : deleteAdapter}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdaptersList));


