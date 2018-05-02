import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import {deleteKlient} from '../../actions/klienterAction';
import DashboardIcon from 'material-ui-icons/Home';
import KlientView from './KlientView';
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

class KlientsList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteKlient= this.deleteKlient.bind(this);
	    this.state = {klienter: this.props.klienter};
	}

	deleteKlient(klient) {
		 this.props.deleteKlient(klient)
	}
	render () {
	  return (
	    <Router>
	     <div>
         	<a href="/" style={{textDecoration:'none'}}><CardHeader	title="Dashboard" avatar={
                    <Avatar style={avtarstyle}>
                        <DashboardIcon/>
                    </Avatar>}/></a>

  			<h1>Klienter</h1>
  			<ul className="list-group">
  				{this.props.klienter.map((klient, i) => 
  			<div>
  	         	<Grid container style={{ lineHeight: '5px' }} spacing={24}>
  	         		<Grid item xs={12} sm={7}>
  	         			<li className="list-group-item" key={i}><Link to={{pathname: '/klient', state: {klient : klient}}} style={{ textDecoration: 'none' }}>{klient.name}</Link></li>
  	         		</Grid>
  	         		<Grid item xs={12} sm={1}>
  	         			<Button size="small" onClick={() => this.deleteKlient(klient)} color="primary" style={{textTransform: 'none'}}>Slett</Button>
  	         		</Grid>
  	         	</Grid>
			</div>

  				)}
	      </ul>

	      <Route
	      	path="/klient"
	      	render={({ props }) => (
	        <KlientView klient={this.props.klient} />
	        )}
	      />
	    </div>
	  </Router>
	    );
	  }

}
	
KlientsList.propTypes = {
	  klienter: PropTypes.array.isRequired
	};

function mapStateToProps(state){
	return {
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({deleteKlient : deleteKlient}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KlientsList));


