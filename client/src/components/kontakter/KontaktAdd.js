import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SearchKontakt from './SearchKontakt';
import { BrowserRouter as Router, Route,  Link, withRouter } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import {fetchKontakter} from '../../actions/kontakterAction';
import {green} from 'material-ui/colors';

const style = {
		  margin: 12,
		  textDecoration: 'none',
		};

const buttonstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],
        textDecoration: 'none',
        textTransform: 'none',

};

class KontaktAdd extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {kontakter: this.props.posts};
	}
componentDidMount() {
 	   this.props.fetchKontakter();

}
  render() {
	  
      return (
    	<Router>	  
        <div>
         <Link to={{pathname: '/addKontakt', state: {kontakter : this.props.kontakter}}} style={{ textDecoration: 'none' }}>
         	<Button style={buttonstyle}>Legg til ny kontakt</Button></Link>
	      <Route
	      	path="/addKontakt"
	      	render={({ state }) => (
	        <SearchKontakt kontakter={this.props.posts} />
	        )} 
	      />
		</div>
	    </Router>
		 
        );
   }
}
function mapStateToProps(state){
	return {
        posts: state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchKontakter: fetchKontakter}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontaktAdd));







