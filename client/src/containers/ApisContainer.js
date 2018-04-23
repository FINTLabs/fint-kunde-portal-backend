import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ApisList from '../components/apis/ApisList';
import OrgList from '../components/apis/OrgList';
import OrgView from '../components/apis/OrgView';
import {fetchApis, fetchOrganisation} from '../actions/apisAction';
import {Grid} from "material-ui";

class ApisContainer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    		posts: this.props.posts,
	    		organisation: this.props.organisation
	    };

	}
	componentDidMount(){
  	     this.props.fetchApis();
  	     this.props.fetchOrganisation()
   }
	render () {

	    if (!this.props.posts) {
	      return <p>Nothing here yet...</p>;
	    } else {
	      return this.renderPosts();
	    }
	  }

	renderPosts () {
	    const apis = this.props.posts;
	    const organisation = this.props.organisation;
		console.log("props");
		console.log(organisation);
	    return (
	         <Grid container xs={12}>
                <Grid item xs={5}>
                	<ApisList apis={apis} />
                </Grid>
                <Grid item xs={7}>
                <h3>Organisation</h3>
                <li className="list-group-item" ><Link to={{pathname: '/organisation', state: {organisation : organisation}}} style={{ textDecoration: 'none' }}>{organisation.name}</Link></li>
        	      <Route
      	      			path="/organisation"
      	      			render={({ state }) => (
      	      			<OrgView organisation={this.props.organisation} />
      	        )}
      	      />
                </Grid>
            </Grid>


    );
  }
}

ApisContainer.propTypes = {
//  apis: PropTypes.array.isRequired,
//  organisation: PropTypes.array.isRequired
};

function mapStateToProps(state){
	return {
        posts: state.posts,
        organisation: state.organisation
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchApis: fetchApis, fetchOrganisation: fetchOrganisation}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ApisContainer));
