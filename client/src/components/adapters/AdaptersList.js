import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, withRouter	} from 'react-router-dom';
import {deleteAdapter} from '../../actions/adaptersAction';
import DashboardIcon from 'material-ui-icons/Home';
import AdapterView from './AdapterView';
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
  			<h3>Adapters</h3>
  			<ul className="list-group">
  				{this.props.adapters.map((adapter, i) => 
  				<div>
	  	         	<Grid container style={{ lineHeight: '5px' }} spacing={24}>
	  	         		<Grid item xs={12} sm={7}>
	  	         			<Link to={{pathname: '/adapter', state: {adapter : adapter}}} style={{ textDecoration: 'none' }}><Button style={linkstyle}>{adapter.name}</Button></Link>
	  	         		</Grid>
	  	         		<Grid item xs={12} sm={5}>
	  	         			<Button bsStyle="primary" onClick={() => this.deleteAdapter(adapter)} style={buttonstyle}>Slett</Button>
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


