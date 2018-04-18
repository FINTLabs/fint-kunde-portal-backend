import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AdaptersList from '../components/adapters/AdaptersList';
import AdapterAdd from '../components/adapters/AdapterAdd';
import {fetchAdapters} from '../actions/adaptersAction';
import {Grid} from "material-ui";

class AdaptersContainer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {posts: this.props.posts};
	}
	componentDidMount(){
  	     this.props.fetchAdapters()

   }
	render () {
	    if (!this.props.posts) {
	      return <p>Nothing here yet...</p>;
	    } else {
	      return this.renderPosts();
	    }
	  }

	renderPosts () {
	    const adapters = this.props.posts;
	    return (
	         <Grid container xs={12}>
                <Grid item xs={5}>
                	<AdaptersList adapters={adapters} />
                </Grid>
                <Grid item xs={7}>
                	<AdapterAdd />
                </Grid>
            </Grid>
  

    );
  }
}

AdaptersContainer.propTypes = {
  adapters: PropTypes.array.isRequired
};

function mapStateToProps(state){
	return {
        posts: state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchAdapters: fetchAdapters}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdaptersContainer));
