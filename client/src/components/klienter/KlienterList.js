import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, withRouter	} from 'react-router-dom';
import {deleteKlient} from '../../actions/klienterAction';
import DashboardIcon from 'material-ui-icons/Home';
import KlientView from './KlientView';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import {Avatar, CardHeader, Grid} from "material-ui";
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

class KlientsList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteKlient= this.deleteKlient.bind(this);
	    this.state = {klienter: this.props.klienter};
	}

//  AddKlientToComponent(event) {
//    this.props.addKlientToComponent(this.state.api);
//}
//
//deleteKlientFromComponent(event) {
//    this.props.deleteKlientFromComponent(this.state.api);
//}
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
  			<h3>Klienter</h3>
  			<ul className="list-group">
  				{this.props.klienter.map((klient, i) => 
  				<div>
	  	         	<Grid container style={{ lineHeight: '5px' }} spacing={24}>
	  	         		<Grid item xs={12} sm={7}>
	  	         			<Link to={{pathname: '/klient', state: {klient : klient}}} style={{ textDecoration: 'none' }}><Button style={linkstyle}>{klient.name}</Button></Link>
	  	         		</Grid>
	  	         		<Grid item xs={12} sm={5}>
	  	         			<Button bsStyle="primary" onClick={() => this.deleteKlient(klient)} style={buttonstyle}>Slett</Button>
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


