import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ApisList from '../components/apis/ApisList';
import OrgList from '../components/apis/OrgList';
import {fetchApis, fetchTechnicalContacts} from '../actions/apisAction';
import {Grid} from "material-ui";
import Button from 'material-ui/Button';

class ApisContainer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    		posts: this.props.posts,
	    		technicalContacts: this.props.technicalContacts,
	    };

	}

  componentDidMount(){
  	   this.props.fetchApis();
  	   this.props.fetchTechnicalContacts();
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
	    const technicalContacts = this.props.technicalContacts
	    console.log("technicalContacts")
	    console.log(technicalContacts)
	    const componentName = apis.name;

	    return (
	         <Grid container xs={12}>
                <Grid item xs={5}>
                	<ApisList apis={technicalContacts} />
                </Grid>
                <Grid item xs={7}>
                	<OrgList apis={apis}/>
                </Grid>
            </Grid>
    );
  }
}

ApisContainer.propTypes = {
  apis: PropTypes.array.isRequired,

};

function mapStateToProps(state){
	return {
        posts: state.posts,

  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchApis: fetchApis}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ApisContainer));
