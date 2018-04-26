import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import KontakterList from '../components/kontakter/KontakterList';
import KontaktAdd from '../components/kontakter/KontaktAdd';
import {fetchKontakter} from '../actions/kontakterAction';
import {Grid} from "material-ui";

class KontakterContainer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {posts: this.props.posts};
	}
	componentDidMount(){
  	     this.props.fetchKontakter()

   }
	render () {
	    if (!this.props.posts) {
	      return <p>Nothing here yet...</p>;
	    } else {
	      return this.renderPosts();
	    }
	  }

	renderPosts () {
	    const kontakter = this.props.posts;
	    return (
	         <Grid container xs={12}>
                <Grid item xs={5}>
                	<KontakterList kontakter={kontakter} />
                </Grid>
                <Grid item xs={7}>
                	<KontaktAdd  kontakter={kontakter} />
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
        posts: state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchKontakter: fetchKontakter}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontakterContainer));
