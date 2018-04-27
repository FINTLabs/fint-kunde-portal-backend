import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import KontakterList from '../components/kontakter/KontakterList';
import KontaktAdd from '../components/kontakter/KontaktAdd';
import {fetchKontakter} from '../actions/kontakterAction';
import {fetchTechnicalContacts} from '../actions/apisAction';
import {Grid} from "material-ui";

class KontakterContainer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {technicalContacts: this.props.technicalContacts};
	}
	componentDidMount(){
	   this.props.fetchTechnicalContacts();
// 	   this.props.fetchKontakter();

   }
	render () {
	    if (!this.props.technicalContacts) {
	      return <p>Nothing here yet...</p>;
	    } else {
	      return this.renderPosts();
	    }
	  }

	renderPosts () {
//	    const kontakter = this.props.posts;
	    const technicalContacts = this.props.technicalContacts;
	    console.log("technicalContacts")
	    console.log(technicalContacts)
	    return (
	         <Grid container xs={12}>
                <Grid item xs={5}>
                	<KontakterList technicalContacts={technicalContacts} />
                </Grid>
                <Grid item xs={7}>
                	<KontaktAdd />
                </Grid>
            </Grid>
  

    );
  }
}

KontakterContainer.propTypes = {
  kontakter: PropTypes.array.isRequired
};

function mapStateToProps(state){
	return {
        posts: state.posts,
        technicalContacts: state.technicalContacts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchKontakter: fetchKontakter, fetchTechnicalContacts: fetchTechnicalContacts}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontakterContainer));
