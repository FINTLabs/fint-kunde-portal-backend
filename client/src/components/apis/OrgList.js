import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route,  Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrgView from './OrgView';
import OrgComponentsLink from './OrgComponentsLink';
import OrgComponentsUnlink from './OrgComponentsUnlink';
import {fetchOrganisation, linkComponent, unlinkComponent} from '../../actions/apisAction';
import {Grid} from "material-ui";
import Button from 'material-ui/Button';

class OrgList extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {organisation: this.props.organisation,
	    		componenetName : this.props.apis[0].name,
	    		components : this.props.apis};
	    this.linkComponent = this.linkComponent.bind(this);
	    this.unlinkComponent = this.unlinkComponent.bind(this);
	}
    
	componentDidMount(){
  	     this.props.fetchOrganisation()

   }

linkComponent(event) {
	  this.props.linkComponent(this.state.componenetName);
}  

unlinkComponent(event) {
	  this.props.unlinkComponent(this.state.componenetName);
}	
handleLink = () => {
	  this.linkComponent(this.state.componenetName)
};
handleUnlink = () => {
	  this.unlinkComponent(this.state.componenetName)
};

	render () {
	    if (!this.props.organisation) {
	      return <p>Nothing here yet...</p>;
	    } else {
	      return this.renderOrgs();
	    }
	  }

	renderOrgs () {

		const organisation = this.props.organisation;
		const components = this.state.components;

	    return (
	    		<Router>
	   	     <div>
	     			<h3>Organistaion</h3>
	     			<Grid container style={{ lineHeight: '5px' }} spacing={24}>
  	         		<Grid item xs={12} sm={4}>
  	         			<h5><Link to={{pathname: '/organisation', state: {organisation : organisation}}} style={{ textDecoration: 'none' }}>{organisation.displayName}</Link></h5>
  	         		</Grid>
  	         		<Grid item xs={6} sm={8}>
  	         		<Link to={{pathname: '/componentsLink'}} style={{ textDecoration: 'none' }}>
  	         			<Button  variant="raised" size="small" style={{textTransform: 'none'}}>Link componenet</Button></Link>&nbsp;&nbsp;
  	         		<Link to={{pathname: '/componentsUnlink'}} style={{ textDecoration: 'none' }}>	
	         			<Button variant="raised" size="small" style={{textTransform: 'none'}}>Unlink componenet</Button></Link>
	         		</Grid>  	         		
  	         	</Grid>
  	         	<Route
  		      		path="/organisation"
  		      		render={({ state }) => (
  		      		<OrgView organisation={organisation} />
  		        )}/>
  	         	<Route
  		      		path="/componentsLink"
  		      		render={({ state }) => (
  		      		<OrgComponentsLink components={components} />
  		        )}/>
  	         	<Route
  		      		path="/componentsUnlink"
  		      		render={({ state }) => (
  		      		<OrgComponentsUnlink components={components} />
  		        )}/>
  	         	</div>

  	         	</Router>
    );
  }
}

OrgList.propTypes = {
//  adapters: PropTypes.array.isRequired
};

function mapStateToProps(state){
	return {
		organisation: state.organisation
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchOrganisation: fetchOrganisation, linkComponent : linkComponent, unlinkComponent : unlinkComponent}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(OrgList));
