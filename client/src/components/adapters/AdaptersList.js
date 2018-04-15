import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import {deleteAdapter} from '../../actions/adaptersAction';
import DashboardIcon from 'material-ui-icons/Home';
import AdapterView from './AdapterView';
import PropTypes from 'prop-types';


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
	     	<table><tbody><tr><td><a href="/"><DashboardIcon/></a></td><td><a href="/" style={{textDecoration:'none', color: 'black'}}>Dashboard</a></td></tr></tbody></table>
  			<h1>Adapters</h1>
  			<ul className="list-group">
  				{this.props.adapters.map((adapter, i) => 
  				<div>
					<table><tr>
						<td width="150"><li className="list-group-item" key={i}><Link to={{pathname: '/adapter', state: {adapter : adapter}}}>{adapter.name}</Link></li></td>
						<td width="50" align="right"><button type="submit" onClick={() => {this.deleteAdapter(adapter)}}>Delete</button></td>
					</tr></table>
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


