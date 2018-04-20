import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import {deleteKontakt} from '../../actions/kontakterAction';
import DashboardIcon from 'material-ui-icons/Home';
import KontaktView from './KontaktView';
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
class KontakterList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteKontakt= this.deleteKontakt.bind(this);
	    this.state = {kontakter: this.props.kontakter};
	}

	deleteKontakt(kontakt) {
		 this.props.deleteKontakt(kontakt)
	}
	render () {
	  return (
	    <Router>
	     <div>
      		<a href="/" style={{textDecoration:'none'}}><CardHeader	title="Dashboard" avatar={
                <Avatar style={avtarstyle}>
                    <DashboardIcon/>
                </Avatar>}/></a>
  			<h1>Kontakter</h1>
  			<ul className="list-group">
  				{this.props.kontakter.map((kontakt, i) => 
  			<div>
  	         	<Grid container style={{ lineHeight: '5px' }} spacing={24}>
  	         		<Grid item xs={12} sm={7}>
  	         			<li className="list-group-item" key={i}><Link to={{pathname: '/kontakt', state: {kontakt : kontakt}}} style={{ textDecoration: 'none' }}>{kontakt.nin}</Link></li>
  	         		</Grid>
  	         		<Grid item xs={12} sm={1}>
  	         			<button style={{ padding: '1px 20px' }} onClick={() => {this.deleteKontakt(kontakt)}} className="btn btn-default">Delete</button>
  	         		</Grid>
  	         	</Grid>
			</div>

  				)}
	      </ul>

	      <Route
	      	path="/kontakt"
	      	render={({ state }) => (
	        <KontaktView kontakt={this.state.kontakt} />
	        )}
	      />
	    </div>
	  </Router>
	    );
	  }

}
	
KontakterList.propTypes = {
	  kontakter: PropTypes.array.isRequired
	};

function mapStateToProps(state){
	return {
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({deleteKontakt : deleteKontakt}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontakterList));


