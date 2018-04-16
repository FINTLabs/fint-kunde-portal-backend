import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import {deleteAdapter} from '../../actions/adaptersAction';
import DashboardIcon from 'material-ui-icons/Home';
import AdapterView from './AdapterView';
import PropTypes from 'prop-types';
import {Grid} from "material-ui";

const styles = {
		  smallIcon: {
		    width: 25,
		    height: 19
		  },
		  small: {
		    width: 25,
		    height: 19
		  },
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
         	<Grid container xs={2}>
         		<Grid item xs={3}>
         			<a href="/"><DashboardIcon iconStyle={styles.smallIcon} style={styles.small}/></a>
         		</Grid>
         		<Grid item xs={1}>
         			<a href="/" style={{textDecoration:'none', color: 'black'}}>Dashboard</a>
         		</Grid>
         	</Grid>
  			<h1>Adapters</h1>
  			<ul className="list-group">
  				{this.props.adapters.map((adapter, i) => 
  			<div>
  	         	<Grid container spacing={24}>
  	         		<Grid item xs={12} sm={10}>
  	         			<li className="list-group-item" key={i}><Link to={{pathname: '/adapter', state: {adapter : adapter}}}>{adapter.name}</Link></li>
  	         		</Grid>
  	         		<Grid item xs={12} sm={2}>
  	         			<button type="submit" onClick={() => {this.deleteAdapter(adapter)}}>Delete</button>
  	         		</Grid>
  	         	</Grid>
			</div>

  				)}
	      </ul>

	      <Route
	      	path="/adapter"
	      	render={({ props }) => (
	        <AdapterView adapter={this.props.adapter} />
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


